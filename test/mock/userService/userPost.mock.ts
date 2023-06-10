export const returnMockCreate = {
  id: 2,
  nome: 'matheus giordani da silva',
  email: 'matheus.giordanioliveira@gmail.com',
  cpf: '129.107.854-16',
  celular: '(82) 99107-9412',
  validacao: 'Validado',
  createdAt: new Date('2023-06-09T15:53:04.605Z'),
};

export const mockUser = {
  nome: 'matheus giordani da silva',
  email: 'matheus.giordanioliveira@gmail.com',
  cpf: '122.107.854-16',
  celular: '(82) 99107-9412',
  conhecimentos: [
    {
      name: 'React',
      code: 2,
    },
    {
      name: 'TypeScript',
      code: 7,
    },
    {
      name: 'Banco de Dados',
      code: 6,
    },
  ],
  validacao: 'Validado',
};

export const MockRegisteredUser = {
  id: 37,
  nome: 'matheus giordani da silva',
  email: 'matheus.giordanioliveira@gmail.com',
  cpf: '129.107.854-16',
  celular: null,
  validacao: 'Validado',
  createdAt: new Date('2023-06-09T15:51:15.026Z'),
  conhecimentos: [
    {
      id: 45,
      nome: 'React',
      userId: 37,
    },
    {
      id: 46,
      nome: 'TypeScript',
      userId: 37,
    },
    {
      id: 47,
      nome: 'Banco de Dados',
      userId: 37,
    },
  ],
};

export const returnMockConhecimentos = [
  {
    id: 1,
    name: 'React',
    userId: 2,
  },
  {
    id: 2,
    name: 'TypeScript',
    userId: 2,
  },
  {
    id: 1,
    name: 'Banco de Dados',
    userId: 2,
  },
];

export const mockConhecimentos = [
  {
    name: 'React',
    userId: 2,
  },
  {
    name: 'TypeScript',
    userId: 2,
  },
  {
    name: 'Banco de Dados',
    userId: 2,
  },
];
