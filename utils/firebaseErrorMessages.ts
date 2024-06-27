const firebaseErrorMessages: { [key: string]: string } = {
  "auth/invalid-email": "The email address is not valid.",
  "auth/user-disabled": "The user account has been disabled.",
  "auth/user-not-found": "There is no user corresponding to this email.",
  "auth/wrong-password": "The password is incorrect.",
  "auth/invalid-credential": "The credential is invalid.",
  "auth/email-already-in-use":
    "The email address is already in use by another account.",
  "auth/operation-not-allowed": "Email/password accounts are not enabled.",
  "auth/weak-password":
    "The password is too weak. Please choose a stronger password.",
  "auth/missing-email": "Please enter your email address.",
  "auth/missing-password": "Please enter your password.",
  "auth/too-many-requests":
    "We have blocked all requests from this device due to unusual activity. Try again later.",
  "auth/invalid-verification-code": "The verification code is invalid.",
  "auth/invalid-verification-id": "The verification ID is invalid.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
  "auth/network-request-failed":
    "A network error (such as timeout, interrupted connection, or unreachable host) has occurred.",
};

export const getErrorMessage = (errorCode: string): string => {
  return (
    firebaseErrorMessages[errorCode] ||
    "An unknown error occurred. Please try again."
  );
};
