# Projeto Robô Paris

## Visão Geral
O Robô Paris é uma solução de automação desenvolvida para extrair e gerenciar extratos bancários de múltiplas empresas e bancos através do portal SS Parisi. O sistema automatiza o processo de login, navegação, download, arquivamento dos extratos e organização de arquivos, otimizando o fluxo de trabalho contábil e garantindo eficiência na coleta de dados financeiros.

Além das funcionalidades principais, o projeto conta com um sistema de geração de relatórios PDF detalhados, que apresenta apenas as empresas e bancos que tiveram erros durante o processamento, facilitando auditorias e o acompanhamento de exceções.

## Principais Funcionalidades

- **Extração Automatizada de Extratos**: Acessa o portal SS Parisi e extrai extratos bancários de múltiplas empresas e bancos.
- **Processamento em Lote**: Processa várias empresas sequencialmente a partir de uma planilha Excel.
- **Organização de Arquivos**: Organiza os extratos baixados em uma estrutura de diretórios por ano e mês.
- **Tratamento de Erros**: Sistema robusto de tratamento de erros com registro detalhado e tentativas múltiplas.
- **Geração de Relatórios**: Geração automática de relatórios PDF detalhados para auditoria.
- **Modo Headless**: Suporte para execução em modo headless (sem interface gráfica), ideal para servidores.
- **Logging Detalhado**: Sistema de logs abrangente para monitoramento e diagnóstico.

## Detalhes Técnicos

### Linguagem de Programação
- **Python**: Linguagem principal do projeto, escolhida por sua simplicidade e amplo suporte a bibliotecas de automação.

### Bibliotecas Principais
- **Selenium**: Framework para automação de navegadores web, utilizado para interagir com o portal SS Parisi.
- **Pandas**: Biblioteca para manipulação e análise de dados, usada para ler a planilha de empresas e processar dados.
- **WebDriver Manager**: Gerenciador automático de drivers de navegadores para o Selenium.

### Outras Bibliotecas
- **datetime**: Manipulação de datas para cálculo de períodos e formatação.
- **os/shutil**: Manipulação de arquivos e diretórios para organização dos extratos.
- **logging**: Sistema de registro de eventos e erros.
- **re**: Expressões regulares para extração de informações específicas.

## Arquitetura do Projeto

### Arquivos Principais
- **roboParis.py**: Versão principal do robô com interface gráfica.
- **roboParisHeadless.py**: Versão do robô para execução sem interface gráfica (modo headless).
- **relacionamentos.py**: Módulo para processamento de relacionamentos entre empresas no portal.

### Fluxo de Execução
1. **Inicialização**: Configuração de logging e inicialização do driver do navegador.
2. **Login**: Autenticação no portal SS Parisi.
3. **Processamento de Empresas**: Leitura da planilha Excel e processamento sequencial de cada empresa.
4. **Identificação de Bancos**: Para cada empresa, identifica os bancos disponíveis.
5. **Extração de Dados**: Para cada banco, extrai os extratos do período especificado.
6. **Organização de Arquivos**: Move os arquivos baixados para a estrutura de diretórios apropriada.
7. **Registro de Erros**: Registra erros encontrados durante o processamento.
8. **Relatório PDF**: Registro detalhado de erros e geração de relatório PDF

## Configuração e Uso

### Requisitos
- Python 3.6 ou superior
- Navegador Chrome instalado
- Acesso ao portal SS Parisi

### Configuração
1. Instale as dependências necessárias:
   ```
   pip install selenium pandas webdriver-manager
   ```
2. Prepare uma planilha Excel chamada "empresas.xlsx" com uma coluna "Empresa" contendo os nomes das empresas a serem processadas.

### Execução
- Para executar a versão com interface gráfica:
  ```
  python roboParis.py
  ```
- Para executar a versão headless (sem interface gráfica):
  ```
  python roboParisHeadless.py
  ```

## Estrutura de Diretórios
- Os extratos são organizados na seguinte estrutura:
  ```
  I:\Contabilidade\Banco Online\{ano}\{mês}\
  ```
- Os logs são armazenados na pasta "logs" no diretório do projeto.

## Tratamento de Erros
- O sistema tenta processar cada empresa até 2 vezes em caso de falha.
- Erros são registrados em arquivos de log detalhados.
- Um arquivo específico de erros é criado na estrutura de diretórios de destino.

## Considerações de Segurança
- As credenciais de acesso estão codificadas diretamente no código-fonte.
- Recomenda-se implementar um sistema mais seguro para gerenciamento de credenciais em ambientes de produção.

---

*Este documento foi gerado automaticamente para fornecer uma visão geral do projeto Robô Paris.*
