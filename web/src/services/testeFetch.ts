async function test() {

  const payload = {
    "providers": [
      {
        "name": "INPE-CDSR",
        "collections": [
          { "name": "AMAZONIA1_WFI_L2_DN" },
          { "name": "AMAZONIA1_WFI_L4_DN" }
        ],
        "method": "POST",
        "query": { "cloud_cover": { "lte": 50 } }
      }
    ],
    "bbox": [-47.930000, -15.780000, -47.930000, -15.780000],
    "datetime": "2021-12-26T00:00:00/2022-01-26T23:59:00",
    "limit": 1
  }

  const myHeaders = new Headers(
    {
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  );

  const myInit: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(payload)
  };

  const response = await fetch('http://www2.dgi.inpe.br/stac-compose/stac/search/', myInit)
  const content = await response.json()
  console.log(content)
}

export default test