use serde_json::json;
use url::Url;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    let uri = _req.uri().to_string();
    let parsed_uri = Url::parse(&uri)?;
    let mut query_pairs = parsed_uri.query_pairs();

    if let Some((_, unparsed_num)) = query_pairs.find(|(key, _)| key == "num") {
        if let Ok(num) = unparsed_num.parse::<i32>() {
            return Ok(Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", "application/json")
                .body(json!({ "isEven": num % 2 == 0 }).to_string().into())?);
        }
        return Ok(Response::builder()
            .status(StatusCode::BAD_REQUEST)
            .header("Content-Type", "application/json")
            .body(
                json!({
                  "message": "Query param 'num' is not a valid integer"
                })
                .to_string()
                .into(),
            )?);
    }

    Ok(Response::builder()
        .status(StatusCode::BAD_REQUEST)
        .header("Content-Type", "application/json")
        .body(
            json!({
              "message": "Required query param 'num' is missing"
            })
            .to_string()
            .into(),
        )?)
}
