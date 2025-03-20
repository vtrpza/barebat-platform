import { builder } from '@builder.io/sdk';

// Initialize the Builder SDK with your public API key
export const initBuilder = () => {
  builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');
};

// Register custom components
export const registerComponents = () => {
  // We'll add component registration here as we create them
};

// Initialize on the client side
if (typeof window !== 'undefined') {
  initBuilder();
}

export { builder }; 