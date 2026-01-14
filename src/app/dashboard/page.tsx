'use client';

import { useState, useEffect } from 'react';
import CardForm from '@/components/forms/CardForm';
import TemplateRenderer from '@/components/templates/TemplateRenderer';
import { ECardData } from '@/components/templates/types';

export default function Dashboard() {
  const [cardData, setCardData] = useState<ECardData>({
    bride_name: '',
    groom_name: '',
    wedding_date: new Date(Date.now() + 86400000 * 30).toISOString(),
    wedding_venue: '',
    template_type: 'elegant',
    is_paid: false,
    music_url: '',
  });

  const handleUpdate = (newData: ECardData) => {
    setCardData(newData);
  };

  const handleSave = async (data: ECardData) => {
    try {
      const url = '/api/ecards';
      const method = data.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const saved = await response.json();
        setCardData({ ...saved, id: saved.id });
        alert('Progress saved successfully!');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar Form */}
      <div className="w-full lg:w-[500px] lg:h-screen lg:overflow-y-auto bg-white border-r border-gray-200 z-10">
        <div className="p-6">
          <CardForm 
            initialData={cardData} 
            onUpdate={handleUpdate} 
            onSave={handleSave} 
          />
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 h-[600px] lg:h-screen bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-12 overflow-hidden">
          {/* Mobile Frame Simulation */}
          <div className="w-full max-w-[375px] h-full lg:h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-gray-900 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-3xl z-50"></div>
            <div className="w-full h-full overflow-y-auto">
              <TemplateRenderer 
                data={cardData} 
                wishes={[]} 
                isPreview={true} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
