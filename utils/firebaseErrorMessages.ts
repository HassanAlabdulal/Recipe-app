const firebaseErrorMessages: { [key: string]: string } = {
  "auth/invalid-email": "The email address is not valid.",
  "auth/user-disabled": "The user account has been disabled.",
  "auth/user-not-found": "There is no user corresponding to this email.",
  "auth/wrong-password": "The password is incorrect.",
  "auth/invalid-credential": "The credential is invalid.",
};

export const getErrorMessage = (errorCode: string): string => {
  return (
    firebaseErrorMessages[errorCode] ||
    "An unknown error occurred. Please try again."
  );
};
