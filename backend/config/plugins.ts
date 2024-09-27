export default ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-firebase-storage",
      providerOptions: {
        serviceAccount: {
          type: "service_account",
          project_id: "jodacs-web",
          private_key_id: "ca75458f563d69f843370c9610d88177d4da5510",
          private_key:
            "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwT4QchMymUlOt\nySK+zDX0/svXoTkLI2kOyQBkts1DUN0Yop+UEjqIW6AMXZqVPVOScG/ZSVRs2bnk\n7dAqYxorPlv5ZTZXJOAUwNET2uIDJV46JQSd5CMBS9Z13xQ19BGbJQ1lTyWa8F4w\nJKG5F0OEmnL6ZJFV+fumICHTYQZmy8sgAQblji7otQoNmzQOjDInbWYNSAjYo6oS\nUxTez3cLMpCNyWN0dTO7QYLuHapDXNhzwBIllztjUowCyre2KEN2B2QreIc6qkoi\nrly2YQnXmp6bdvAYfXfJ5ako+iAb6LQVaRUK1EfyMEIPAZGGG11XbuqbUl6bDpPu\nrkT3I5RdAgMBAAECggEAF31omRIaX/hs/KTlE62KbMs7pk1tF65Ok3E1M7XlMBhI\ndL1J7ITnNn6amrsn2sVSapq/VCBAdsYlTbpfdx5AAM3snBQfgsm/bxRnZrFNVmT2\nomGHNXANN+F+P7MKcsvDQrvThpFebb+jlN90in/ud27KbdDTSjSlkfMK/qoZG73H\ng9S4dFhMRceEAi0H+qoBLfxWgFkYSu59WfmwxgtVCxnETL/d63T6YkaPBEvmXtfb\nR7A78d0tkqOYynY81am6LZ5x7zIXQ3S8bimF/j1kS8JPkpSMXIdYEXjGYAAOfOWW\n7DDWwSCaZlb3+0jZvvdmTxjZxRae0IVLb9P9QDXsYQKBgQDWcsAjYrLGytEmGVY0\n+2E+A2IsSUZDN5ePOJwORbnjS6e/rN7zImMkCw+8bBfzMq9v08H1ZweAcO/kAaCK\n+NOZzTZhkQmIZGQF0caVwCVAIoOk8jBaz7x91YqqytDVty4nlGij02SwvtOCQ/l+\nTlQqCqqT8Ath1ZdA8YEypTVf8QKBgQDSeQd5NnVqqk5EN8pSElUpxAmv0E2wk8Hn\njsJk8KhNWt2sukStloxip2pACjoPPD0r45olEXFqh6EjLCkRDPHrqUvt11fkp1Wl\n6GJP3B0TOH62FXWzYMZahcDtE3zKtcO3Y7vLCWT2Ln/KcXOs5kREiiRRkb5ZMh6e\n0b3vYWQnLQKBgDFLlYFM2d26l5NTda6eLn9L1dBqU5119P/2OmFJg+6M4JW+Dk4D\nlJifdlGQ43yDJTLmkYpw0Zej3nEiMp5fjnynYJ3S8kcJFLkFvMmFrspsZKiRB66I\nXELsyIB0OMc34YM1qUwndtjuNL6YE40GQnCbnRR+tI8bwzYpjdJvibJxAoGAVuQA\nYdpJvy9wAFnH/Pn0jrmQBjVI3Y0ikCYvutxfnw/UVGrRz5hHfLMA+k8+iOullWjx\nSjxZRlGYBJ1GlvNxLIlH/3jXoF40zbmSXMXSewznwuQ5I0Tgnp55d2aELmu70Qor\njTbjp36q4zjTOJ4XsPQW6lXw74Hxgj+02g6q+kECgYEAxYElHeXUWbZJcwARVCZR\nl2998mt+GcuBUYtrzkoJO2FyHf3d7EaMP8eeB/+Va9vDh4YCl3V/I8YDbvp/E6Nl\nk+TrpENpKn3lkPvVk2kBFrkWHbZT9CnOen+JgbwLtuLJ5bL5lxGNV4PDc5tCm+Jw\nHbMq3LShoFaHv/lASba/B+A=\n-----END PRIVATE KEY-----\n",
          client_email:
            "firebase-adminsdk-jkdre@jodacs-web.iam.gserviceaccount.com",
          client_id: "100766818202126694003",
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url:
            "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jkdre%40jodacs-web.iam.gserviceaccount.com",
          universe_domain: "googleapis.com",
        },
        bucket: env(
          "https://storage.googleapis.com/jodacs-web.appspot.com",
          "jodacs-web.appspot.com"
        ),
        sortInStorage: true,
        debug: false,
        publicFiles: true,
      },
    },
  },
  "strapi-v5-plugin-populate-deep": {
    config: {
      defaultDepth: 10,
    },
  },
});
