import { SuiClient } from '@mysten/sui.js/client';

const NETWORK = process.env.REACT_APP_SUI_NETWORK || 'devnet';

export const provider = new SuiClient({ url: `https://fullnode.${NETWORK}.sui.io` });

export const getObjectFields = async (objectId: string) => {
  try {
    const object = await provider.getObject({
      id: objectId,
      options: { showContent: true },
    });
    
    if (
      object.data &&
      'content' in object.data &&
      object.data.content &&
      'fields' in object.data.content
    ) {
      return object.data.content.fields;
    }
    return null;
  } catch (error) {
    console.error('Error fetching object fields:', error);
    return null;
  }
};