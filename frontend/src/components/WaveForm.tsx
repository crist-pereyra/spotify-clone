import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveformProps {
  audioRef: HTMLAudioElement | null;
  currentTime: number;
  duration: number;
}

export const Waveform = ({ audioRef }: WaveformProps) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveformRef.current || !audioRef) return;
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#aaa',
      progressColor: '#1ED760',
      cursorColor: 'rgba(0, 0, 0, 0)',
      height: 80,
      barWidth: 2,
    });

    wavesurferRef.current.load(audioRef.src);

    // Sincronizar con el tiempo actual
    const syncTime = () => {
      if (wavesurferRef.current && audioRef) {
        wavesurferRef.current.seekTo(audioRef.currentTime / audioRef.duration);
      }
    };

    audioRef.addEventListener('timeupdate', syncTime);

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
      audioRef.removeEventListener('timeupdate', syncTime);
    };
  }, [audioRef]);

  return (
    <div
      style={{
        width: '100%',
        height: '80px',
      }}
      ref={waveformRef}
    ></div>
  );
};
