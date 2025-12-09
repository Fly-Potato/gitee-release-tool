use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct TokenInfo {
    access_token: String,
    created_at: u64,
    expires_in: u64,
    refresh_token: String,
    scope: String,
    token_type: String,
}

impl TokenInfo {
    pub fn update(&mut self, token_info: TokenInfo) {
        self.access_token = token_info.access_token;
        self.created_at = token_info.created_at;
        self.expires_in = token_info.expires_in;
        self.refresh_token = token_info.refresh_token;
        self.scope = token_info.scope;
        self.token_type = token_info.token_type;
    }
}
