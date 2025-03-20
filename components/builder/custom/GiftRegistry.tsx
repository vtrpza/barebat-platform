'use client';

import { Builder } from '@builder.io/react';
import { useState } from 'react';

interface GiftOption {
  id: string;
  title: string;
  description: string;
  amount: number;
  image?: string;
}

interface GiftRegistryProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  accentColor?: string;
  textColor?: string;
  currency?: string;
  giftOptions?: GiftOption[];
  customAmountEnabled?: boolean;
  showImages?: boolean;
}

const defaultGiftOptions: GiftOption[] = [
  {
    id: '1',
    title: 'Torah Study Materials',
    description: 'Help support the celebrant\'s continued Jewish education',
    amount: 180,
    image: '/gifts/torah.jpg',
  },
  {
    id: '2',
    title: 'Israel Trip Fund',
    description: 'Contribute to a future trip to Israel',
    amount: 360,
    image: '/gifts/israel.jpg',
  },
  {
    id: '3',
    title: 'Tzedakah Donation',
    description: 'Make a charitable donation in honor of the celebrant',
    amount: 72,
    image: '/gifts/tzedakah.jpg',
  },
];

export const GiftRegistry = ({
  title = 'Gift Registry',
  subtitle = 'Your presence is our greatest gift. If you wish to contribute, here are some meaningful options:',
  backgroundColor = '#ffffff',
  accentColor = '#2563eb',
  textColor = '#1f2937',
  currency = 'R$',
  giftOptions = defaultGiftOptions,
  customAmountEnabled = true,
  showImages = true,
}: GiftRegistryProps) => {
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const handleGiftSelect = (giftId: string) => {
    setSelectedGift(giftId);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedGift(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.replace(/[^A-Z]/g, ''),
    }).format(amount);
  };

  return (
    <div
      className="py-16 px-4 sm:px-6 lg:px-8 rounded-lg"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg opacity-80">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {giftOptions.map((gift) => (
            <div
              key={gift.id}
              className={`rounded-lg border p-6 cursor-pointer transition-all duration-200 ${
                selectedGift === gift.id ? 'ring-2 ring-opacity-50' : ''
              }`}
              style={{
                borderColor: accentColor,
                backgroundColor: selectedGift === gift.id ? `${accentColor}10` : 'transparent',
              }}
              onClick={() => handleGiftSelect(gift.id)}
            >
              {showImages && gift.image && (
                <div className="relative h-40 mb-4 rounded-md overflow-hidden">
                  <img
                    src={gift.image}
                    alt={gift.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{gift.title}</h3>
              <p className="text-sm mb-4 opacity-80">{gift.description}</p>
              <p className="text-2xl font-bold" style={{ color: accentColor }}>
                {formatCurrency(gift.amount)}
              </p>
            </div>
          ))}
        </div>

        {customAmountEnabled && (
          <div className="mt-12 max-w-md mx-auto">
            <div className="border rounded-lg p-6" style={{ borderColor: accentColor }}>
              <h3 className="text-xl font-semibold mb-4">Custom Amount</h3>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">{currency}</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full pl-12 pr-4 py-2 rounded-md border focus:ring-2 focus:ring-opacity-50"
                  style={{ borderColor: accentColor }}
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            className="px-8 py-3 rounded-md font-medium text-white transition-colors duration-200"
            style={{ backgroundColor: accentColor }}
            disabled={!selectedGift && !customAmount}
          >
            Proceed to Gift
          </button>
        </div>
      </div>
    </div>
  );
};

// Register the component with Builder.io
Builder.registerComponent(GiftRegistry, {
  name: 'Gift Registry',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Gift Registry',
    },
    {
      name: 'subtitle',
      type: 'string',
      defaultValue: 'Your presence is our greatest gift. If you wish to contribute, here are some meaningful options:',
    },
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: '#ffffff',
    },
    {
      name: 'accentColor',
      type: 'color',
      defaultValue: '#2563eb',
    },
    {
      name: 'textColor',
      type: 'color',
      defaultValue: '#1f2937',
    },
    {
      name: 'currency',
      type: 'string',
      defaultValue: 'R$',
    },
    {
      name: 'giftOptions',
      type: 'array',
      subFields: [
        {
          name: 'id',
          type: 'string',
          required: true,
        },
        {
          name: 'title',
          type: 'string',
          required: true,
        },
        {
          name: 'description',
          type: 'string',
          required: true,
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
        },
        {
          name: 'image',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
        },
      ],
      defaultValue: defaultGiftOptions,
    },
    {
      name: 'customAmountEnabled',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'showImages',
      type: 'boolean',
      defaultValue: true,
    },
  ],
}); 