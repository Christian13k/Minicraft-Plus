{ pkgs }: {
  deps = [
    pkgs.google-cloud-sdk
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}