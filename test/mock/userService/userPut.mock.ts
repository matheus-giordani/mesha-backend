export const returnPutMock = {
  id: 37,
  nome: 'matheus giordani da silva',
  email: 'matheus.giordanioliveira@gmail.com',
  cpf: '129.107.854-16',
  celular: null,
  validacao: 'Validado',
  createdAt: new Date('2023-06-09T15:51:15.026Z'),
};

export const returnPutExistingUser = {
  id: 37,
  nome: 'matheus giordani da silva',
  email: 'matheus.giordanioliveira@gmail.com',
  cpf: '129.107.854-16',
  celular: null,
  validacao: 'Validado',
  createdAt: new Date('2023-06-09T15:51:15.026Z'),
  conhecimentos: [
    {
      id: 81,
      nome: 'React',
      userId: 37,
    },
    {
      id: 82,
      nome: 'TypeScript',
      userId: 37,
    },
  ],
};

export const putUserMock = {
  id: 37,
  nome: 'matheus giordani da silva',
  email: 'matheus.giordanioliveira@gmail.com',
  cpf: '129.107.854-16',
  celular: null,
  validacao: 'Validado',
  createdAt: '2023-06-09T15:51:15.026Z',
  conhecimentos: [
    {
      name: 'React',
      code: 2,
    },
    {
      name: 'TypeScript',
      code: 7,
    },
  ],
};
