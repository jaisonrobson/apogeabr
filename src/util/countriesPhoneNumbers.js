import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const phoneNumberExamples = {
    US: "+1 (212) 555-1234",    // EUA
    BR: "+55 11 98765-4321",    // Brasil
    GB: "+44 7911 123456",      // Reino Unido
    FR: "+33 6 12 34 56 78",    // França
    DE: "+49 170 1234567",      // Alemanha
    IT: "+39 333 1234567",      // Itália
    CA: "+1 416-555-1234",      // Canadá
    AU: "+61 4 1234 5678",      // Austrália
    JP: "+81 90 1234 5678",     // Japão
    IN: "+91 98765 43210",      // Índia
    ZA: "+27 82 123 4567",      // África do Sul
    MX: "+52 1 55 1234 5678",   // México
    ES: "+34 612 345 678",      // Espanha
    AR: "+54 9 11 1234-5678",   // Argentina
    RU: "+7 900 123-45-67",     // Rússia
    CN: "+86 138 1234 5678",    // China
    KR: "+82 10 1234 5678",     // Coreia do Sul
    SG: "+65 9123 4567",        // Singapura
    CH: "+41 78 123 4567",      // Suíça
    NL: "+31 6 1234 5678",      // Países Baixos (Holanda)
    SE: "+46 70 123 45 67",     // Suécia
    BE: "+32 478 123 456",      // Bélgica
    GR: "+30 697 123 4567",     // Grécia
    PT: "+351 912 345 678",     // Portugal
    PL: "+48 601 123 456",      // Polônia
    NO: "+47 901 23 456",       // Noruega
    DK: "+45 12 34 56 78",      // Dinamarca
    FI: "+358 40 123 4567",     // Finlândia
    HU: "+36 30 123 4567",      // Hungria
    CZ: "+420 602 123 456",     // República Tcheca
    RO: "+40 712 345 678",      // Romênia
    BG: "+359 888 123 456",     // Bulgária
    HR: "+385 91 234 5678",     // Croácia
    SK: "+421 903 123 456",     // Eslováquia
    RS: "+381 63 123 456",      // Sérvia
    UA: "+380 50 123 4567",     // Ucrânia
    TH: "+66 81 234 5678",      // Tailândia
    MY: "+60 12 123 4567",      // Malásia
    ID: "+62 812 1234 5678",    // Indonésia
    PH: "+63 912 345 6789",     // Filipinas
    VN: "+84 912 345 678",      // Vietnã
    TZ: "+255 789 123 456",     // Tanzânia
    UG: "+256 701 234 567",     // Uganda
    ET: "+251 912 345 678",     // Etiópia
    MA: "+212 661 234 567",     // Marrocos
    EG: "+20 100 123 4567",     // Egito
    KE: "+254 701 234 567",     // Quênia
    NG: "+234 701 234 5678",    // Nigéria
    AE: "+971 50 123 4567",     // Emirados Árabes Unidos
    KW: "+965 500 1234",        // Kuwait
    SA: "+966 50 123 4567",     // Arábia Saudita
    QA: "+974 5522 1234",       // Catar
    BH: "+973 396 12345",       // Bahrein
    OM: "+968 9123 4567",       // Omã
    JO: "+962 79 123 4567",     // Jordânia
    PS: "+970 599 123 456",     // Palestina
    IL: "+972 50 123 4567",     // Israel
    SY: "+963 944 123 456",     // Síria
    LB: "+961 70 123 456",      // Líbano
    YE: "+967 711 234 567",     // Iémen
    AF: "+93 700 123 456",      // Afeganistão
    PK: "+92 300 123 4567",     // Paquistão
    BD: "+880 1711 234 567",    // Bangladesh
}

export const generatePhoneNumberExample = (countryCode) => {
  // Usa o formato padrão para o país ou cria um número fictício
  const phoneExample = phoneNumberExamples[countryCode] || "+1 (XXX) XXX-XXXX"

  // Verifica se o número gerado é válido para o país
  const phoneNumber = parsePhoneNumberFromString(phoneExample, countryCode)

  if (phoneNumber && phoneNumber.isValid()) {
    return phoneNumber.formatNational() // Retorna o número formatado nacionalmente
  } else {
    return "Número inválido"
  }
}
