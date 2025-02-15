import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0"
import clientPromise from '@/lib/mongodb';

export async function GET(req, res) {  
  try {    
    // Get Auth0 user session
    const session = await auth0.getSession();    
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });    

    const auth0UserID = session.user.sub;
    console.log(auth0UserID);

    const client = await clientPromise;
    const db = client.db('myDatabase');
        
    // Connect to MongoDB        
    const websitesCollection = db.collection("userWebsites");

    // Fetch websites for the Auth0 user
    const userWebsites = await websitesCollection.findOne({ userId: auth0UserID });

    if (!userWebsites || !userWebsites.websites){
      return NextResponse.json({ websites: []}, { status: 200 });
    } else {
      console.log(userWebsites.websites);
    }

    return NextResponse.json({ websites: userWebsites.websites }, { status: 200});
  } catch (error) {
    console.error("Error fetching websites:", error);
    return NextResponse.json({ error: "Internal Server Error"}, { status: 500});    
  }
}

//get, 

export async function DELETE(req, res) {
  try {
    // Get Auth0 user session
    const session = await auth0.getSession();    
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });    

    const body = await req.json();

    console.log(body);

    const website = body.website;
    console.log(website);

    if (!website){
      return NextResponse.json({ error: "Invalid website"}, { status: 400 });
    }

    const auth0UserID = session.user.sub;
    console.log(auth0UserID);

    const client = await clientPromise;
    const db = client.db('myDatabase');
        
    // Connect to MongoDB        
    const websitesCollection = db.collection("userWebsites");

    // Fetch websites for the Auth0 user
    const userWebsites = await websitesCollection.findOne({ userId: auth0UserID });

    if (!userWebsites || !userWebsites.websites){
      return NextResponse.json({ error: "Website list empty"}, { status: 404 });
    }
    if (userWebsites.websites.includes(website)) {
      userWebsites.websites = userWebsites.websites.filter(w => w !== website);
      await websitesCollection.updateOne({ userId: auth0UserID }, { $set: { websites: userWebsites.websites }});
    } else {
      return NextResponse.json({ error: "Website not found"}, { status: 404 });
    }      
    return NextResponse.json({ websites: userWebsites.websites }, { status: 200});
  }
  catch (error) {
    console.error("Error fetching websites:", error);
    return NextResponse.json({ error: "Internal Server Error"}, { status: 500});    
  }
}