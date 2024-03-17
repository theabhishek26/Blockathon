use candid::{CandidType, Deserialize};
use ic_cdk::*;
use ic_cdk_macros::*;
use std::collections::HashMap;
use reqwest::get;
#[derive(Clone, Debug, CandidType, Deserialize)]
struct Interaction {
    timestamp: u64,
    transaction_volume: u64,
    smart_contracts_interacted: u64,
}

pub type  interaction_data = HashMap<Principal, Vec<Interaction>>
 
// #[derive(Default, CandidType, Deserialize)]
// struct Web3Credibility {
//     principal_id:Principal,
//     

// }

thread_local! {
    static INTERACTIONS: RefCell<interaction_data> = RefCell::new();
}


fn web3_credibility() -> &'static mut Web3Credibility {
    storage::get_mut::<Web3Credibility>()
}

#[update]
fn add_interaction(account: String, timestamp: u64, transaction_volume: u64, smart_contracts_interacted: u64) {
    let interaction = Interaction {
        timestamp,
        transaction_volume,
        smart_contracts_interacted,
    };

    web3_credibility().interactions.entry(account).or_insert_with(Vec::new).push(interaction);
}


#[query]
fn get_interactions(account: String) -> Vec<Interaction> {
    let web3_credibility = storage::get::<Web3Credibility>();
    web3_credibility.interactions.get(&account).cloned().unwrap_or_default()
}


#[query]
fn calculate_credibility(account: String) -> u64 {
    web3_credibility().interactions.get(&account).map_or(0, |interactions| {
        interactions.iter().fold(0, |acc, interaction| {
            acc + interaction.transaction_volume + interaction.smart_contracts_interacted
        })
    })
}
