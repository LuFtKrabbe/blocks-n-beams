export enum ValidationPattern {
  FirstName = '^[ A-Za-z-]{1,25}$',
  LastName = '^[ A-Za-z-]{1,25}$',
  Password = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[\\d!#$%&*@A-Z^a-z]{8,25}$',
  Address = '^[\\d A-Za-z-]{1,32}$',
  Region = '^[ A-Za-z]{1,32}$',
  City = '^[ A-Za-z-]{1,32}$',
  Phone = '^\\+?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4,6}$',
}

export enum ValidationMessage {
  FirstName = 'May contain alphabet, space and dash (length 1-25).',
  LastName = 'May contain alphabet, space and dash (length 1-25).',
  Password = 'Must include at least one uppercase and lowercase letter and digit (length 8-25).',
  Address = 'May contain alphabet, digit, space and dash (length 1-32).',
  Region = 'May contain alphabet, space and dash (length 1-32).',
  City = 'May contain alphabet, space and dash (length 1-32).',
  Phone = 'Enter correct phone number (e.g. +79681112233)',
}
