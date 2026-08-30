# Mealheiro Digital — Site de Download

## Estrutura

```text
mealheiro-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── downloads/
    └── mealheiro-digital.apk   <-- coloca aqui o teu APK
```

## Como publicar no GitHub Pages

1. Cria um repositório no GitHub.
2. Coloca `index.html`, a pasta `css`, a pasta `js` e a pasta `downloads`.
3. Copia o teu APK para:
   `downloads/mealheiro-digital.apk`
4. Faz commit/push.
5. No GitHub vai a **Settings → Pages**.
6. Em **Build and deployment**, escolhe **Deploy from a branch**.
7. Seleciona a branch `main` e a pasta `/ (root)`.
8. Guarda e abre o endereço do GitHub Pages.

O botão **Baixar APK** já está configurado para descarregar:
`downloads/mealheiro-digital.apk`

### Importante
O APK tem de estar efetivamente no repositório para o botão funcionar.
Se o GitHub bloquear o upload por tamanho, usa Git LFS ou um serviço de releases/ficheiros e altera o `href` do botão para o endereço do APK.
