# DCTFWeb Automation

## Descrição do Projeto

O DCTFWeb Automation é uma ferramenta de automação desenvolvida para facilitar o processo de download de declarações da DCTFWeb (Declaração de Débitos e Créditos Tributários Federais Previdenciários e de Outras Entidades e Fundos) diretamente do site da Receita Federal do Brasil. Este projeto utiliza automação de interface gráfica para navegar pelo portal da Receita Federal, realizar login com certificado digital, selecionar empresas por CNPJ e baixar as declarações correspondentes.

## Tecnologias Utilizadas

- **Python 3**: Linguagem de programação principal
- **PyAutoGUI**: Biblioteca para automação de interface gráfica (controle de mouse e teclado)
- **Pandas**: Manipulação e análise de dados, especialmente para leitura de arquivos Excel
- **Pyperclip**: Manipulação da área de transferência do sistema
- **JSON**: Armazenamento de configurações (posições do mouse)
- **Logging**: Sistema de registro de eventos e erros
- **Datetime**: Manipulação de datas para organização de arquivos
- **OS e Shutil**: Manipulação de arquivos e diretórios
- **Regular Expressions (re)**: Processamento e validação de strings (CNPJs)

## Estrutura do Projeto

- **dctfweb_automation.py**: Script principal que contém toda a lógica de automação
- **mouse_positions.json**: Arquivo de configuração com as coordenadas de clique do mouse
- **criar_excel_teste.py**: Script auxiliar para criar um arquivo Excel de teste com CNPJs
- **teste.xlsx**: Arquivo Excel com CNPJs de exemplo para processamento
- **requirements.txt**: Lista de dependências do projeto
- **Downloads/**: Diretório onde são armazenados os arquivos baixados, organizados por data e CNPJ

## Funcionalidades

1. **Automação de Login**: Acessa o portal da Receita Federal e realiza login com certificado digital
2. **Processamento em Lote**: Capacidade de processar múltiplos CNPJs a partir de um arquivo Excel
3. **Resolução de Captcha**: Assistência para resolução do captcha do site
4. **Download Automático**: Baixa as declarações DCTFWeb automaticamente
5. **Organização de Arquivos**: Move os arquivos baixados para diretórios organizados por data e CNPJ
6. **Logging Detalhado**: Registro completo de todas as operações e possíveis erros

## Como Utilizar

1. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```

2. Configure as posições do mouse no arquivo `mouse_positions.json` de acordo com a resolução da sua tela

3. Prepare um arquivo Excel com os CNPJs a serem processados (ou use o script `criar_excel_teste.py` para gerar um arquivo de teste)

4. Execute o script principal:
   ```
   python dctfweb_automation.py
   ```

5. Não mova o mouse durante a execução do script. Para abortar a qualquer momento, mova o mouse rapidamente para o canto superior esquerdo da tela.

## Segurança e Considerações

- O script utiliza PyAutoGUI com FAILSAFE ativado, permitindo abortar a execução movendo o mouse para o canto superior esquerdo da tela
- As credenciais de acesso são fornecidas via certificado digital, sem armazenamento de senhas no código
- Os logs detalhados permitem acompanhar e auditar todas as operações realizadas

## Requisitos do Sistema

- Python 3.6 ou superior
- Navegador Google Chrome instalado
- Certificado digital válido para acesso ao portal da Receita Federal
- Resolução de tela compatível com as coordenadas definidas no arquivo de configuração

---

*Nota: Este projeto é uma ferramenta de automação e não possui vínculo oficial com a Receita Federal do Brasil. O uso desta ferramenta é de responsabilidade do usuário.*
