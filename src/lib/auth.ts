import { account, databaseId, databases } from './appwrite';
import { ID, Models } from 'appwrite';

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error('Logout failed', error);
    return false;
  }
};

// Simplified email register + doc creation
export const registerUser = async (email: string, password: string, name: string, phone?: string, abhaId?: string) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    // Create login session right away
    await account.createEmailPasswordSession(email, password);
    // Save to patients DB collection
    await databases.createDocument(databaseId, 'patients', newAccount.$id, {
      name,
      email,
      phone: phone || null,
      abha_id: abhaId || null
    });
    return newAccount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
