'use client';
import React, { useEffect, useState } from 'react';

export default function ChangeText() {
  const texts = ['복잡한', '귀찮은', '어려운'];
  const [text, setText] = useState(texts);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalText = setInterval(() => {
      setIndex((idx) => (idx + 1) % texts.length);
    }, 850);
    return () => clearInterval(intervalText);
  }, []);
  return (
    <div>
      <h1>
        {text[index]} UTM 관리 <br />
        유렉카로 해결하세요!
      </h1>
    </div>
  );
}
