import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const navy = "#1e3a5f", gold = "#e07b00", cream = "#faf7f2", white = "#ffffff", lightGray = "#f3f0eb", muted = "#6b6050", textC = "#1a1510", border = "#e2d9ce";

const BLOG_POSTS = [
  {
    slug: "best-realtor-holland-michigan-lakeshore",
    title: "How to Find the Best Realtor in Holland, Michigan for Lakeshore Homes",
    date: "April 2026",
    category: "West Michigan",
    hero: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
    excerpt: "Buying a home on the West Michigan lakeshore is one of the best lifestyle decisions you can make — but finding the right agent matters. Here is what to look for.",
    content: [
      "Holland, Michigan has become one of the most sought-after real estate markets in the Midwest. With its stunning Lake Michigan beaches, award-winning downtown, and proximity to Grand Rapids, it attracts everyone from first-time buyers to vacation home seekers to Chicago families looking to relocate.",
      "But buying lakeshore property is different from buying a standard suburban home. The market moves fast, waterfront zoning can be tricky, and pricing varies dramatically from one street to the next. That is why finding a realtor who genuinely knows the Holland and West Michigan lakeshore corridor is critical.",
      "Here is what to look for when choosing a realtor in Holland, Michigan:",
      "Local knowledge matters more than anything. A good Holland realtor should be able to tell you the difference between buying in Macatawa Park versus Central Park versus the north side. They should know which streets flood, which neighborhoods have the best appreciation, and which areas are zoned for short-term rentals if that is part of your plan.",
      "Look for someone who knows multiple markets. Many lakeshore buyers are relocating from Chicago or other parts of the Midwest. An agent who understands both where you are coming from and where you are going can make the transition dramatically smoother — especially if you need to time the sale of one home with the purchase of another.",
      "Experience with vacation homes and investment properties is a plus. If you are buying a second home in Holland, Saugatuck, Grand Haven, or Douglas, you want an agent who understands vacation home financing, rental income potential, and the unique insurance considerations that come with waterfront property.",
      "At the end of the day, the best realtor in Holland is someone who picks up the phone, knows the streets, and puts your interests first. The lakeshore market rewards preparation and speed — and having the right agent in your corner makes all the difference."
    ]
  },
  {
    slug: "saugatuck-douglas-vacation-home-guide",
    title: "Saugatuck and Douglas: The Complete Vacation Home Buying Guide",
    date: "April 2026",
    category: "West Michigan",
    hero: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    excerpt: "Saugatuck and Douglas are two of Michigan's most charming small towns. Here is everything you need to know about buying a vacation home there.",
    content: [
      "Saugatuck and Douglas sit side by side on the eastern shore of Lake Michigan, about 30 minutes south of Holland and two and a half hours from downtown Chicago. Together they form one of the most desirable vacation home markets in the entire Midwest.",
      "Saugatuck is known for its thriving art gallery scene, boutique shopping, and Oval Beach — consistently ranked among the best beaches in the country. Douglas is quieter and more residential, with a charming downtown of its own and slightly lower price points. Many buyers look at both towns before deciding.",
      "What does a vacation home cost here? Prices vary widely. You can find charming cottages in Douglas starting in the mid $400,000s, while waterfront homes in Saugatuck proper can exceed $2 million. The sweet spot for most vacation buyers is between $500,000 and $800,000 — enough to get a well-maintained three-bedroom home within walking or biking distance of the water.",
      "One important consideration is short-term rental regulations. Both Saugatuck and Douglas have specific ordinances governing vacation rentals, and they change frequently. If renting your home when you are not using it is part of your financial plan, make sure your agent understands the current rules and can help you identify properties in zones that allow it.",
      "The best time to buy is typically late fall or winter when inventory is higher and competition is lower. Summer is peak season and homes move fast — often with multiple offers. If you are serious about buying, getting pre-approved and working with a local agent before spring hits gives you a significant advantage.",
      "Saugatuck and Douglas offer something rare: a genuine small-town lifestyle on one of the most beautiful stretches of freshwater coastline in the world. For Chicago families, Michigan residents, and remote workers looking for a home base with character, it is hard to beat."
    ]
  },
  {
    slug: "grand-haven-zeeland-real-estate",
    title: "Grand Haven and Zeeland: Hidden Gems of West Michigan Real Estate",
    date: "April 2026",
    category: "West Michigan",
    hero: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
    excerpt: "Grand Haven and Zeeland offer incredible value compared to Holland and Saugatuck. Here is why smart buyers are looking at these West Michigan communities.",
    content: [
      "When people think of West Michigan lakeshore real estate, Holland and Saugatuck usually come to mind first. But two nearby communities — Grand Haven and Zeeland — are increasingly attracting buyers who want the same lifestyle at a better value.",
      "Grand Haven sits at the mouth of the Grand River where it meets Lake Michigan, about 20 minutes north of Holland. It is famous for its boardwalk, musical fountain, and stunning state park beach. The downtown is walkable, lively, and packed with restaurants and shops. For families, the school system is excellent and the community is tight-knit.",
      "Real estate in Grand Haven offers strong value compared to Holland. You can typically find a well-maintained three-bedroom home within a mile of downtown for $350,000 to $550,000 — significantly less than comparable properties in Holland or Saugatuck. Waterfront and water-view properties command a premium but are still more accessible than their counterparts further south.",
      "Zeeland is a different proposition entirely. Located about 10 minutes east of Holland, it is a small, tight-knit community with excellent schools, low crime, and a charming Main Street. Zeeland tends to attract families and buyers who want a quieter lifestyle with easy access to both Holland and Grand Rapids. Home prices here are among the most affordable on the lakeshore corridor, with many options in the $275,000 to $450,000 range.",
      "For investors, both communities offer interesting opportunities. Grand Haven has a strong short-term rental market driven by summer tourism, and Zeeland offers solid long-term rental demand from families and young professionals priced out of Holland.",
      "Whether you are a first-time buyer looking for affordability, a family seeking great schools, or an investor looking for value — Grand Haven and Zeeland deserve a serious look."
    ]
  },
  {
    slug: "moving-from-chicago-to-west-michigan",
    title: "Moving from Chicago to West Michigan: What You Need to Know in 2026",
    date: "April 2026",
    category: "Relocation",
    hero: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    excerpt: "More Chicago families are making the move to West Michigan than ever. Here is a practical guide to making the transition.",
    content: [
      "The Chicago-to-West-Michigan pipeline is real and it is growing. Every year, more families, remote workers, and retirees are trading the Chicago metro for communities like Holland, Grand Rapids, Grand Haven, and Saugatuck. The reasons are straightforward: lower cost of living, access to Lake Michigan beaches, excellent schools, and a pace of life that feels like a permanent vacation.",
      "The first question most people ask is: can I afford more house? The answer is almost always yes. The median home price in the Chicago metro hovers around $350,000, while many West Michigan communities offer comparable or larger homes for similar prices — but with significantly lower property taxes, no city sticker fees, and a lower overall cost of living.",
      "Timing the move is critical. If you own a home in Chicago, the ideal scenario is selling your Chicago property and buying in Michigan in a coordinated transaction. This requires an agent who is licensed in both states and can manage both timelines simultaneously. Trying to juggle two separate agents in two different markets adds unnecessary stress and communication gaps.",
      "What about jobs? The rise of remote work has been the single biggest driver of Chicago-to-Michigan migration. Grand Rapids has a thriving economy of its own — anchored by healthcare, manufacturing, and a growing tech scene. Holland has a surprisingly strong employer base including major manufacturers and a vibrant small business community.",
      "Schools are a major draw. West Michigan school districts consistently rank among the best in the state, and private school options are plentiful. For families with school-age children, the education upgrade alone is often worth the move.",
      "The lifestyle shift is significant but overwhelmingly positive. You trade the CTA for a 10-minute drive to the beach. You trade Lincoln Park crowds for Saugatuck art walks. You trade property tax bills that make your eyes water for rates that feel almost reasonable. And you gain something that is harder to quantify: a community where people know your name.",
      "If you are considering the move, the best first step is talking to an agent who knows both markets. Understanding what your Chicago home is worth, what your budget buys in Michigan, and how to time everything is the foundation of a smooth relocation."
    ]
  },
  {
    slug: "investing-southwest-florida-real-estate-airbnb",
    title: "Investing in Southwest Florida Real Estate: Airbnb, Winter Homes, and Long-Term Rentals",
    date: "April 2026",
    category: "SW Florida",
    hero: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&q=80",
    excerpt: "Fort Myers, Naples, and Sarasota offer some of the strongest investment returns in the Sun Belt. Here is how to approach the market.",
    content: [
      "Southwest Florida has been one of the hottest real estate investment corridors in the country for the past decade, and the fundamentals remain strong heading into 2026. Fort Myers, Naples, Cape Coral, Bonita Springs, and Sarasota each offer distinct investment profiles — and understanding the differences is key to making a smart purchase.",
      "Fort Myers is the value play. Entry prices are lower than Naples or Sarasota, rental demand is strong year-round, and appreciation has been consistent. Single-family homes in the $400,000 to $600,000 range can generate meaningful Airbnb income during peak season (December through April) while also serving as a personal winter home the rest of the year. Cape Coral, just across the river, offers even lower entry points with canal-front properties that attract boating enthusiasts.",
      "Naples is the premium market. Higher price points, but also higher rents and a clientele willing to pay top dollar for quality vacation rentals. If your budget allows, Naples properties tend to appreciate faster and attract longer-staying, higher-spending guests. The trade-off is a higher barrier to entry — expect to spend $700,000 or more for a property that pencils out as an investment.",
      "Sarasota splits the difference. It offers a vibrant cultural scene, beautiful Gulf beaches, and a diverse housing stock from downtown condos to barrier island homes. Sarasota attracts a younger demographic than Naples and has a year-round rental market, not just seasonal. For investors who want both lifestyle and returns, Sarasota is increasingly the sweet spot.",
      "The Airbnb angle is compelling but requires homework. Florida counties and municipalities have varying regulations on short-term rentals. Some areas require specific licenses, others restrict rentals in certain zones, and HOAs frequently have their own rules. Before purchasing an investment property, verify the short-term rental regulations for that specific address — not just the city.",
      "For Midwest buyers — particularly from Illinois, Michigan, and the upper Midwest — Southwest Florida has always been the default winter escape. Buying a property that serves as your own winter home while generating Airbnb income the rest of the year is one of the most popular and practical investment strategies in the region.",
      "The key to investing successfully in Southwest Florida is working with an agent who understands both the local market and your home market. If you are buying from out of state, you need someone who can coordinate remotely, manage the inspection and closing process, and give you honest advice about which neighborhoods and property types match your goals."
    ]
  },
  {
    slug: "chicago-investment-property-section-8-guide",
    title: "Chicago Investment Properties and Section 8: A Practical Guide for Investors",
    date: "April 2026",
    category: "Chicagoland",
    hero: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=1200&q=80",
    excerpt: "Chicago remains one of the best cities in the country for rental property investors. Here is what you need to know about Section 8 and building a portfolio.",
    content: [
      "Chicago has always been an investor-friendly city. Compared to coastal markets, entry prices are lower, rental demand is consistent, and the tenant pool is deep. For investors willing to learn the market and work with the right team, Chicagoland offers some of the best risk-adjusted returns in the country.",
      "The South and Southwest suburbs are particularly attractive for investment. Communities like Markham, Country Club Hills, Dolton, Park Forest, Hazel Crest, and Lansing offer single-family homes in the $150,000 to $300,000 range with strong rental demand. Many of these properties are well-suited for the Section 8 Housing Choice Voucher program.",
      "Section 8 investing gets a bad reputation from people who have never done it properly. When executed well, it offers guaranteed government-backed rent payments, long-term tenant stability, and predictable cash flow. The key is property condition — HUD requires inspections, and properties must meet specific habitability standards. Investors who maintain their properties well tend to have excellent experiences with the program.",
      "The process works like this: you purchase a property, make sure it meets HUD inspection standards, list it at the fair market rent for the area, and accept tenants with Housing Choice Vouchers. The housing authority pays a portion (often most) of the rent directly to you each month. Tenants pay their portion, which is based on their income.",
      "Common mistakes new Section 8 investors make include overpaying for properties, underestimating repair costs, and not understanding the inspection requirements before closing. Working with an agent who has direct experience with Section 8 transactions can save you thousands and months of headaches.",
      "Beyond Section 8, Chicago offers opportunities in multi-unit buildings, fix-and-flip, and traditional long-term rentals. The city proper and the surrounding suburbs each have their own dynamics — and an agent who knows the numbers, the neighborhoods, and the tenant market is the most valuable asset in your investment toolkit.",
      "Whether you are buying your first investment property or adding to an existing portfolio, Chicago remains one of the smartest markets in the country for real estate investors."
    ]
  }
];

function FadeIn({ children, delay }) {
  var d = delay || 0;
  var ref = useRef();
  var _s = useState(false);
  var show = _s[0]; var setShow = _s[1];
  useEffect(function() {
    var obs = new IntersectionObserver(function(entries) { if (entries[0].isIntersecting) setShow(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return function() { obs.disconnect(); };
  }, []);
  return (
    <div ref={ref} style={{ opacity:show?1:0, transform:show?"translateY(0)":"translateY(18px)", transition:"opacity 0.5s ease "+d+"s, transform 0.5s ease "+d+"s" }}>
      {children}
    </div>
  );
}

function BlogList() {
  return (
    <div style={{fontFamily:"Georgia, serif",background:cream,color:textC,minHeight:"100vh"}}>
      <style>{[
        "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');",
        "* { box-sizing:border-box; margin:0; padding:0; }",
        "a { text-decoration:none; }",
        "@media(max-width:768px){ .blog-grid { grid-template-columns:1fr !important; } .blog-header { padding:80px 20px 40px !important; } .blog-body { padding:40px 20px !important; } }"
      ].join(" ")}</style>

      <div className="blog-header" style={{background:navy,padding:"100px 40px 60px",textAlign:"center"}}>
        <Link to="/" style={{fontSize:14,color:"rgba(255,255,255,0.6)",display:"inline-block",marginBottom:16}}>&#8592; Back to Home</Link>
        <h1 style={{fontFamily:"serif",fontSize:"clamp(28px,4vw,48px)",color:white,marginBottom:12}}>Market Insights</h1>
        <p style={{fontWeight:300,fontSize:15,color:"rgba(255,255,255,0.7)",maxWidth:500,margin:"0 auto"}}>Local knowledge, market trends, and buying guides from Cody Starostka — licensed in IL, MI, and FL.</p>
      </div>

      <div className="blog-body" style={{maxWidth:1100,margin:"0 auto",padding:"60px 40px"}}>
        <div className="blog-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
          {BLOG_POSTS.map(function(post, i) {
            return (
              <FadeIn key={post.slug} delay={i * 0.08}>
                <Link to={"/blog/" + post.slug} style={{display:"block"}}>
                  <div style={{background:white,border:"1px solid "+border,borderRadius:12,overflow:"hidden",transition:"transform 0.2s,box-shadow 0.2s",cursor:"pointer"}}
                    onMouseOver={function(e){e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,0.1)";}}
                    onMouseOut={function(e){e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                    <img src={post.hero} alt={post.title} style={{width:"100%",height:180,objectFit:"cover"}} />
                    <div style={{padding:"20px 22px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                        <span style={{fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:gold,fontWeight:700}}>{post.category}</span>
                        <span style={{fontSize:11,color:muted}}>{post.date}</span>
                      </div>
                      <h3 style={{fontFamily:"serif",fontSize:17,color:navy,lineHeight:1.4,marginBottom:10}}>{post.title}</h3>
                      <p style={{fontWeight:300,fontSize:13,color:muted,lineHeight:1.7}}>{post.excerpt}</p>
                      <div style={{marginTop:14,fontSize:12,color:gold,fontWeight:700}}>Read More &#8594;</div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <footer style={{background:navy,padding:"30px 40px",textAlign:"center"}}>
        <div style={{fontFamily:"serif",fontSize:17,color:white,marginBottom:5}}>Cody Starostka</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginBottom:6}}>eXp Realty · Licensed in Illinois · Michigan · Florida</div>
        <div style={{fontSize:12,marginBottom:8}}>
          <a href="tel:+17083109619" style={{color:"rgba(255,255,255,0.55)",textDecoration:"none"}}>(708) 310-9619</a>
          <span style={{margin:"0 8px",color:"rgba(255,255,255,0.25)"}}>·</span>
          <a href="mailto:codystarostka@gmail.com" style={{color:"rgba(255,255,255,0.55)",textDecoration:"none"}}>codystarostka@gmail.com</a>
        </div>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",lineHeight:1.8}}>
          IL License #475199260 · The Axon Group, eXp Realty · MI License #6501470306 · eXp Realty · FL License #SL3637841 · eXp Realty
        </div>
      </footer>
    </div>
  );
}

function BlogPost({ slug }) {
  var post = BLOG_POSTS.find(function(p) { return p.slug === slug; });
  if (!post) return <div style={{padding:100,textAlign:"center"}}>Post not found. <Link to="/blog" style={{color:gold}}>Back to blog</Link></div>;

  useEffect(function() { window.scrollTo(0, 0); }, [slug]);

  return (
    <div style={{fontFamily:"Georgia, serif",background:cream,color:textC,minHeight:"100vh"}}>
      <style>{[
        "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');",
        "* { box-sizing:border-box; margin:0; padding:0; }",
        "a { text-decoration:none; }",
        "@media(max-width:768px){ .post-header { padding:80px 20px 40px !important; } .post-body { padding:40px 20px !important; } }"
      ].join(" ")}</style>

      <div style={{position:"relative",overflow:"hidden"}}>
        <img src={post.hero} alt={post.title} style={{width:"100%",height:400,objectFit:"cover"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(10,20,40,0.85) 0%, rgba(10,20,40,0.3) 100%)"}} />
        <div className="post-header" style={{position:"absolute",bottom:0,left:0,right:0,padding:"40px 60px"}}>
          <Link to="/blog" style={{fontSize:13,color:"rgba(255,255,255,0.6)",display:"inline-block",marginBottom:14}}>&#8592; All Articles</Link>
          <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
            <span style={{fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"#f8c060",fontWeight:700,background:"rgba(224,123,0,0.2)",padding:"4px 10px",borderRadius:4}}>{post.category}</span>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.6)"}}>{post.date}</span>
          </div>
          <h1 style={{fontFamily:"serif",fontSize:"clamp(24px,3.5vw,40px)",color:white,lineHeight:1.3,maxWidth:700}}>{post.title}</h1>
        </div>
      </div>

      <div className="post-body" style={{maxWidth:720,margin:"0 auto",padding:"60px 40px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:40,paddingBottom:20,borderBottom:"1px solid "+border}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:navy,display:"flex",alignItems:"center",justifyContent:"center",color:white,fontFamily:"serif",fontSize:14,fontWeight:700}}>CS</div>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:navy}}>Cody Starostka</div>
            <div style={{fontSize:11,color:muted}}>eXp Realty · Licensed in IL, MI, FL</div>
          </div>
        </div>

        {post.content.map(function(paragraph, i) {
          return (
            <FadeIn key={i} delay={i * 0.03}>
              <p style={{fontWeight:300,fontSize:16,lineHeight:2,color:"#2d2820",marginBottom:24}}>{paragraph}</p>
            </FadeIn>
          );
        })}

        <div style={{background:navy,borderRadius:12,padding:36,marginTop:48,textAlign:"center"}}>
          <h3 style={{fontFamily:"serif",fontSize:22,color:white,marginBottom:10}}>Ready to Talk?</h3>
          <p style={{fontWeight:300,fontSize:14,color:"rgba(255,255,255,0.7)",lineHeight:1.8,marginBottom:20}}>Whether you are buying, selling, investing, or just have questions about any of my markets — reach out. No pressure, no obligation.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="tel:+17083109619" style={{textDecoration:"none"}}><button style={{background:gold,color:white,border:"none",padding:"12px 24px",fontSize:13,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",cursor:"pointer",borderRadius:6}}>Call (708) 310-9619</button></a>
            <Link to="/" style={{textDecoration:"none"}}><button style={{background:"transparent",border:"2px solid rgba(255,255,255,0.4)",color:white,padding:"12px 24px",fontSize:13,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",cursor:"pointer",borderRadius:6}}>Visit My Website</button></Link>
          </div>
        </div>
      </div>

      <footer style={{background:navy,padding:"30px 40px",textAlign:"center"}}>
        <div style={{fontFamily:"serif",fontSize:17,color:white,marginBottom:5}}>Cody Starostka</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginBottom:6}}>eXp Realty · Licensed in Illinois · Michigan · Florida</div>
        <div style={{fontSize:12,marginBottom:8}}>
          <a href="tel:+17083109619" style={{color:"rgba(255,255,255,0.55)",textDecoration:"none"}}>(708) 310-9619</a>
          <span style={{margin:"0 8px",color:"rgba(255,255,255,0.25)"}}>·</span>
          <a href="mailto:codystarostka@gmail.com" style={{color:"rgba(255,255,255,0.55)",textDecoration:"none"}}>codystarostka@gmail.com</a>
        </div>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",lineHeight:1.8}}>
          IL License #475199260 · The Axon Group, eXp Realty · MI License #6501470306 · eXp Realty · FL License #SL3637841 · eXp Realty
        </div>
      </footer>
    </div>
  );
}

export { BlogList, BlogPost, BLOG_POSTS };
