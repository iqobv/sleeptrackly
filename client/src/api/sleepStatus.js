export const fetchSleepStatusByUserId = async (userId) => {
  const res = await fetch(`/api/v1/sleep/user/${userId}`);

  if (!res.ok) throw new Error("Failed to fetch sleep status");

  return res.json();
};

export const updateSleepStatus = async (userId) => {
  const res = await fetch(`/api/v1/sleep/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to update sleep status");

  return res.json();
};
