"use server";
export const verifyIdentity = async (token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/user`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjY5NzZjZTUwLTEzYjctNGE4Yy04MjA5LTVhMDQyY2EyMTE2NSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Zjampvbml4ZW14c25rcWlyd3NqLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJhNDQ5MWMwOC00M2YwLTRlZGItYjQ3OC0yYmE3NWRlOTA1NDkiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzc3MzU1NDY0LCJpYXQiOjE3NzczNTE4NjQsImVtYWlsIjoiYW1vc2RhbmllbDIwMDVAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImFtb3NkYW5pZWwyMDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImE0NDkxYzA4LTQzZjAtNGVkYi1iNDc4LTJiYTc1ZGU5MDU0OSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTc3NzM1MTg2NH1dLCJzZXNzaW9uX2lkIjoiOGMxZDA2NzgtMjM0Ni00M2MxLTlhMzAtNjY3MTg0N2I4Mzg1IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.dFD7ZXQH6Az7Ptq3JJx-ZdB49w-S86rtcPYdCeX120OaA8ye3n-c6Mk0c2Rl2z0X9fNOc6xMfCt_04Ff2kdD0A `,
        },
      },
    );

    const data = await res.json();

    console.log(data);
    if (!data?.status) {
      return {
        message: data?.message || "Something went wrong!",
        status: data?.status,
      };
    }

    return { message: "Welcome!", status: data?.status };
  } catch (e) {
    return { message: e?.message, status: false };
  }
};
