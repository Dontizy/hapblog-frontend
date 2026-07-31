import { api } from "../lib/api";
import type {
  Login,
  LoginResponse,
  ProfileResponse,
  UploadAvatar,
  UploadAvatarResponse,
  UpdateBio,
  UpdateBioResponse,
  ChangePassword,
  ChangePasswordResponse,
  PublicUserResponse,
  FollowUnFollowUserResponse
} from "../lib/user";

export const loginUser = async (user: Login): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/user/login", user);
  return res.data;
};

export const getUserProfile = async (): Promise<ProfileResponse> => {
  const res = await api.get<ProfileResponse>("/user/auth/profile");
  return res.data;
};

export const uploadAvatar = async (
  avatar: UploadAvatar,
): Promise<UploadAvatarResponse> => {
  const formData = new FormData();
  formData.append("avatar", avatar.avatar);
  const res = await api.patch<UploadAvatarResponse>(
    "/user/auth/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const updateBio =async (bio:UpdateBio): Promise<UpdateBioResponse> =>{
      const res = await api.patch<UpdateBioResponse>("/user/auth/bio/update", bio)
      return res.data
}

export const changePassword =async (password:ChangePassword): Promise<ChangePasswordResponse> =>{
      const res = await api.put<ChangePasswordResponse>("/user/auth/password-update", password)
      return res.data
}

export const getPublicUserProfile =async(id:string):Promise<PublicUserResponse> =>{
        const res = await api.get<PublicUserResponse>(`/user/auth/${id}`)
        return res.data
}


export const toggleFollowUser = async(id:string):Promise<FollowUnFollowUserResponse>=>{
      const res = await api.patch<FollowUnFollowUserResponse>(`/user/auth/${id}/follow`)
      return res.data
}
