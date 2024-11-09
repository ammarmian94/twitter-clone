import { useMutation } from "@tanstack/react-query";

const useUpdateUserProfile = () => {
  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: async (formData) => {
        try {
          const res = await fetch("/api/user/update", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "Something went wronng");
          }

          return data;
        } catch (error) {
          throw new Error(error);
        }
      },

      onSuccess: () => {
        toast.success("Profile updated successfully");
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["authUser"] }),
          queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        ]);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateProfile, isUpdatingProfile };
};

export default useUpdateUserProfile;
