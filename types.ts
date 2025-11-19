
import React from 'react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  Icon: React.FC<{ className?: string }>;
  path: string;
  color: string;
  hoverColor: string;
  accept?: string;
  outputFilename?: string;
}

export type AuthMode = 'login' | 'signup';