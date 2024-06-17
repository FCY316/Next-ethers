import { create } from "zustand";

interface AppState {
  addressType: string;
  setAddressType: (token: string) => void;
}

export const useAddressType = create<AppState>((set) => {
  let addressType = "fb";
  if (typeof window !== "undefined") {
    addressType = localStorage.getItem("addressType") || "fb";
  }
  return {
    // 初始化的值
    addressType,
    // 设置token
    setAddressType: (addressType: string) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("addressType", addressType);
        return set({ addressType });
      }
    },
  };
});

export default useAddressType;
