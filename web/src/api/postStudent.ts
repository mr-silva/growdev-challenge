export interface IStudentPost {
  name: string;
  documentNumber: string;
  email: string;
}

export const postStudent = async (baseUrl: string, body: IStudentPost) => {
  await fetch(`${baseUrl}/student`, {
    method: "POST",
    body: JSON.stringify(body),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 201) {
        return true;
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};
