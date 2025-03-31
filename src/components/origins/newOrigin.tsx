import { useMangaDatabase } from "@/database/useMangaDatabase";
import { Button } from "react-native";
const fetch = require("node-fetch");

export default function NewOrigin() {
  const mangaDatabase = useMangaDatabase();

  function obterVersaoDoScript(conteudo: string) {
    const regex = /^\/\/\s*(.*?):(\d+\.\d+\.\d+)/;
    const resultado = conteudo.match(regex);
    return resultado ? { name: resultado[1], version: resultado[2] } : null;
  }

  const fetchGithubCode = async (githubLink: string) => {
    try {
      // Requisição do arquivo .js do repositório GitHub
      const response = await fetch(githubLink);

      const code = await response.text();

      return code;
    } catch (error) {
      console.error("Erro ao requisitar o código do GitHub:", error);
      return null;
    }
  };

  const extractFetchMangas = (code: string) => {
    const regex = /const fetchMangas = async \(\) => \{[\s\S]*?\};/;

    const match = code.match(regex);

    if (match && match[0]) {
      return match[0];
    } else {
      console.error("Função fetchMangas não encontrada no código.");
      return null;
    }
  };

  const updateMangaCode = async () => {
    const githubLink =
      "https://raw.githubusercontent.com/manga-reader-mobileapp/sources/main/manga-livre.js";

    const code = await fetchGithubCode(githubLink);

    const version = obterVersaoDoScript(code);

    if (version && code) {
      try {
        const fetchMangasCode = extractFetchMangas(code);

        if (fetchMangasCode) {
          await mangaDatabase.saveCode({
            name: version.name,
            githubLink: githubLink,
            version: version.version,
            fetchMangas: fetchMangasCode,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <Button title="Adicionar nova fonte" onPress={updateMangaCode} />;
}
