import { atom } from "jotai";

const addNewServerAtom = atom({
  server: {
    id: "",
    isVerified: "",
  },
  googleSheet: {
    id: "",
  },
});

export { addNewServerAtom };
