// import faunadb from "faunadb";
const faunadb = window.faunadb;
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnAE8-96BpACWvzI1gSsSzLPULZoEfIzmIBJQyGe",
  scheme: "https",
});
let scripts = document.getElementById("helper");
let url = scripts.getAttribute("src", -1);
let author = getURLParameter("name");
let userId = getURLParameter("id");
let AdSlots = getURLParameter("AdSlotID");
const adArray = AdSlots.split(",");

function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(url) || [
        ,
        "",
      ])[1].replace(/\+/g, "%20")
    ) || null
  );
}

async function findAdvertisementForSlot(userID, AdSlot) {
  let campaignAndAdvt = [];

  let response = [];
  let p = await client.query(
    q.Get(q.Ref(q.Collection("demo_collection"), userID))
  );
  // console.log("P", p);
  for (let i in AdSlot) {
    campaignAndAdvt = await criteriaOne(p, AdSlot[i], i);
    // console.log(campaignAndAdvt);

    if (campaignAndAdvt.length < 1) {
      campaignAndAdvt = await criteriaTwo(p, AdSlot[i], i);
      // console.log("campaigAndAdvt for cirteria two", campaignAndAdvt);
    }
    response.push([AdSlot[i], campaignAndAdvt]);
    // console.log("responsevalue", response);
    const ImageSlot1 = document.getElementById(response[i][0]);
    // console.log(ImageSlot1);
    let img = document.createElement("img");
    img.classList.add("db_image");
    img.src = response[i][1].assetUrl;
    ImageSlot1.appendChild(img);
    // console.log(ImageSlot1);
  }
}
findAdvertisementForSlot(userId, adArray);

async function criteriaOne(p, AdSlotId, i) {
  // console.log("inside criteria ONe");
  let documents = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("demo_collection"))),
      q.Lambda((x) => q.Get(x))
    )
  );

  let results = [];
  let requiredDocuments = [];
  documents.data.map(async (document) => {
    if (
      p.data.publisherProfile.matchingCriteria.includeAdvertizers.includes(
        document.data.user.siteName
      )
    ) {
      requiredDocuments.push(document);
    }
  });
  let n = requiredDocuments.length;
  if (n < 1) {
    return results;
  }
  let document = requiredDocuments[((i % n) + n) % n];
  let randomCampaign = Math.floor(
    Math.random() * document.data.advertizerProfile.campaigns.length
  );
  let randomAd = Math.floor(
    Math.random() *
      document.data.advertizerProfile.campaigns[randomCampaign].ads.length
  );
  // console.log("randomAD", randomAd);
  // console.log("randomCampaign", randomCampaign);
  // console.log("document", document);
  const ans = {
    userId: document.data.user.name,
    siteName: document.data.user.siteName,
    campaignName:
      document.data.advertizerProfile.campaigns[randomCampaign].campaignName,
    landingPageUrl:
      document.data.advertizerProfile.campaigns[randomCampaign].landingPageUrl,
    adId: document.data.advertizerProfile.campaigns[randomCampaign].ads[
      randomAd
    ].adId,
    assetType:
      document.data.advertizerProfile.campaigns[randomCampaign].ads[randomAd]
        .assetType,
    assetUrl:
      document.data.advertizerProfile.campaigns[randomCampaign].ads[randomAd]
        .assetUrl,
  };

  //   results.push(ans);

  return ans;
}

async function criteriaTwo(p, AdSlotId, i) {
  let results = [];
  let documents = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("demo_collection"))),
      q.Lambda((x) => q.Get(x))
    )
  );
  // console.log("i", i);
  let requiredDocuments = [];
  documents.data.map(async (document, id) => {
    if (
      !document.data.advertizerProfile.matchingCriteria.excludePublishers.includes(
        p.data.user.siteName
      ) &&
      document.data.user.siteName !== p.data.user.siteName
    ) {
      requiredDocuments.push(document);
    }
  });
  let n = requiredDocuments.length;

  let document = requiredDocuments[((i % n) + n) % n];

  let randomCampaign = Math.floor(
    Math.random() * document.data.advertizerProfile.campaigns.length
  );

  let randomAd = Math.floor(
    Math.random() *
      document.data.advertizerProfile.campaigns[randomCampaign].ads.length
  );

  const ans = {
    userId: document.data.user.name,
    siteName: document.data.user.siteName,
    campaignName:
      document.data.advertizerProfile.campaigns[randomCampaign].campaignName,
    landingPageUrl:
      document.data.advertizerProfile.campaigns[randomCampaign].landingPageUrl,
    adId: document.data.advertizerProfile.campaigns[randomCampaign].ads[
      randomAd
    ].adId,
    assetType:
      document.data.advertizerProfile.campaigns[randomCampaign].ads[randomAd]
        .assetType,
    assetUrl:
      document.data.advertizerProfile.campaigns[randomCampaign].ads[randomAd]
        .assetUrl,
  };

  return ans;
}
