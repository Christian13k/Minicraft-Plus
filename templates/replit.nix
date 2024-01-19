{ pkgs }: {
  deps = [
    pkgs.google-cloud-sdk-gce
    pkgs.nodePackages.vscode-langservers-extracted  
  ];
}