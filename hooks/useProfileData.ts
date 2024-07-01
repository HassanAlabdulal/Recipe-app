// hooks/useProfileData.ts
import { useState, useEffect } from "react";
import { auth, db } from "@/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

const useProfileData = () => {
  const [profileData, setProfileData] = useState<any>({
    name: "",
    age: "",
    bio: "",
    location: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      }
      setLoading(false);
    };

    fetchProfileData();
  }, []);

  return { profileData, loading };
};

export default useProfileData;
