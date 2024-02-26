import { IResponseData, IPaginatedListResponse } from "../utils/IResponseData";

export interface IStudent {
  id: string;
  name: string;
  documentNumber: string;
  academicRegistry: string;
}

let students: IStudent[] = [];

export const getStudents = async (baseUrl: string) => {
  await fetch(`${baseUrl}/student?page=1&size=50`, {
    method: "GET",
  })
    .then((response) => {
      students = [];

      return response.json();
    })
    .then((res) => {
      const responseData: IResponseData<IPaginatedListResponse<IStudent>> = res;

      students = responseData.data.items;
    });

  return students;
};
