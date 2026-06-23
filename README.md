# Controller Bill Div

Aplicativo mobile de controle financeiro pessoal desenvolvido em React Native com Expo. Permite gerenciar receitas, despesas e acompanhar o histórico financeiro de forma simples e intuitiva.

## Objetivo

O objetivo do aplicativo é auxiliar usuários no controle de suas finanças pessoais, permitindo registrar receitas e despesas, acompanhar pagamentos e visualizar o histórico financeiro de forma organizada.

## Funcionalidades

* Cadastro e autenticação de usuários
* Cadastro, edição e exclusão de receitas
* Cadastro, edição e exclusão de despesas
* Controle de despesas pagas e pendentes
* Histórico de movimentações financeiras
* Pesquisa de receitas e despesas
* Geração de relatório em PDF
* Meta financeira personalizada
* Tema claro e escuro (Dark Mode)

## Tecnologias utilizadas

* React Native
* Expo
* Expo Router
* Firebase Authentication
* Firebase Firestore
* Zustand
* Moti
* React Native Toast Message
* React Native DateTimePicker
* Expo Print
* Expo Sharing

## Como instalar

```bash
npm install
```

## Como executar

```bash
npx expo start
```

Ou para executar diretamente no Android:

```bash
npm run android
```

## Como gerar o APK

```bash
npx eas build:configure
npx eas build -p android --profile preview
```

## Release

O APK pode ser disponibilizado através do link gerado pelo Expo EAS Build após a conclusão da compilação.

## Desenvolvedores do Projeto

Érick,
Pedro Henrique Rodrigues de Souza,
Venisson.