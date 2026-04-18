import { account, databaseId, databases } from './appwrite';
import { ID, Models, OAuthProvider } from 'appwrite';

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
    try {
      await account.deleteSession("current");
    } catch (_) {
      // Ignored if there's no active session
    }
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const successUrl = `${window.location.origin}/dashboard`;
    const failureUrl = `${window.location.origin}/login?error=oauth_failed`;
    account.createOAuth2Session(OAuthProvider.Google, successUrl, failureUrl);
  } catch (error) {
    console.error('Google login failed', error);
    throw error;
  }
};
