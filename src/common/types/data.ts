export type groupData = {
  id: number;
  name: string;
}
export type departmentData = {
  id: number;
  name: string;
}

export type userData = {
  id: number;
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  phone_number: string;
  group: groupData,
  department: departmentData
};