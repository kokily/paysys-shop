module.exports = {
  apps: [
    {
      name: "paysys-shop",
      cwd: "/home/ubuntu/paysys-shop",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
