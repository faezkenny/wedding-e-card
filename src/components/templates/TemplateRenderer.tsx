'use client';

import CuteTemplate from './Cute';
import ElegantTemplate from './Elegant';
import FormalTemplate from './Formal';
import { ECardData, Wish } from './types';

interface TemplateRendererProps {
  data: ECardData;
  wishes: Wish[];
  isPreview?: boolean;
}

export default function TemplateRenderer({ data, wishes, isPreview }: TemplateRendererProps) {
  switch (data.template_type) {
    case 'cute':
      return <CuteTemplate data={data} wishes={wishes} isPreview={isPreview} />;
    case 'formal':
      return <FormalTemplate data={data} wishes={wishes} isPreview={isPreview} />;
    case 'elegant':
    default:
      return <ElegantTemplate data={data} wishes={wishes} isPreview={isPreview} />;
  }
}
