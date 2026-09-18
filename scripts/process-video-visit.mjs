import { execFileSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';

const inputVideo = 'public/video-visit/romeo-new.mp4';
const outputVideo = 'public/video-visit/romeo-videovizitka.mp4';
const outputPoster = 'public/video-visit/romeo-videovizitka-poster.jpg';
const tempOutput = 'public/video-visit/romeo-videovizitka-temp.mp4';

console.log('Using ffmpeg at:', ffmpegPath);

if (!fs.existsSync(inputVideo)) {
  console.error('Input video not found:', inputVideo);
  process.exit(1);
}

// Exact timing: 1s before speech (3.85s) to 1s after speech (39.88s)
const startTime = '00:00:03.850';
const duration = '36.03'; // seconds

console.log(`Processing video: start=${startTime}, duration=${duration}s...`);

// Video filter chain:
// 1. Zoomed-in close-up crop: 530x530 centered on face (x=375, y=80)
//    Guarantees full close-up face focus, keeping cap top and chin fully intact with minimal background.
// 2. NO deshake (deshake was causing facial warping / jello distortion between head and jaw)
// 3. Upscale to 1080x1080 with high-quality lanczos
// 4. Natural unsharp mask for crystal clear retina detail
const vFilter = [
  'crop=530:530:375:80',
  'scale=720:720:flags=lanczos',
  'unsharp=3:3:0.4:3:3:0.0',
  'eq=contrast=1.05:brightness=0.01:saturation=1.06',
].join(',');

// Audio filter graph:
// Clean studio voice:
// - adeclip + adeclick: eliminates crackles, clicks, and digital clipping
// - highpass 75Hz: cuts sub-bass rumble
// - lowpass 11kHz: cuts high-frequency hiss
// - equalizer: softens 3.2kHz sibilance
// - acompressor: smooth studio vocal compression
// - loudnorm: broadcast loudness normalization (-16 LUFS)
const filterComplex = [
  `[0:v]${vFilter}[outv]`,
  `[0:a]adeclip,adeclick,highpass=f=75,lowpass=f=11000,equalizer=f=3200:t=q:w=1.5:g=-2.5,acompressor=threshold=-18dB:ratio=2.5:attack=15:release=120:makeup=2dB,loudnorm=I=-16:LRA=10:TP=-1.5[outa]`,
].join(';');

const args = [
  '-y',
  '-ss', startTime,
  '-i', inputVideo,
  '-t', duration,
  '-filter_complex', filterComplex,
  '-map', '[outv]',
  '-map', '[outa]',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-profile:v', 'high',
  '-level', '4.1',
  '-pix_fmt', 'yuv420p',
  '-crf', '19',
  '-g', '30',
  '-keyint_min', '30',
  '-sc_threshold', '0',
  '-bf', '2',
  '-maxrate', '2500k',
  '-bufsize', '5000k',
  '-c:a', 'aac',
  '-b:a', '192k',
  '-ar', '48000',
  '-movflags', '+faststart',
  tempOutput,
];

console.log('Running ffmpeg command...');
const startTs = Date.now();

try {
  execFileSync(ffmpegPath, args, { stdio: 'inherit' });
  console.log(`Video processing finished in ${((Date.now() - startTs) / 1000).toFixed(1)}s!`);

  fs.copyFileSync(tempOutput, outputVideo);
  fs.unlinkSync(tempOutput);
  console.log('Replaced', outputVideo, 'successfully!');

  const stat = fs.statSync(outputVideo);
  console.log(`Final file size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);

  // Generate new poster at 1.5s into the processed video
  console.log('Generating crisp poster frame...');
  execFileSync(ffmpegPath, [
    '-y',
    '-ss', '00:00:01.500',
    '-i', outputVideo,
    '-vframes', '1',
    '-q:v', '2',
    outputPoster,
  ]);
  console.log('Generated new poster at:', outputPoster);

} catch (err) {
  console.error('Error during video processing:', err);
  process.exit(1);
}
