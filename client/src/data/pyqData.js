// Company groupings for the selector UI
export const companyGroups = [
  {
    "name": "Technical Firms",
    "companies": [
      "Google",
      "Amazon",
      "Meta",
      "Apple",
      "Netflix",
      "Microsoft",
      "Oracle"
    ]
  },
  {
    "name": "Big 4",
    "companies": [
      "Deloitte",
      "PwC",
      "EY",
      "KPMG"
    ]
  },
  {
    "name": "Consultancy",
    "companies": [
      "McKinsey",
      "BCG",
      "Bain & Company",
      "Accenture"
    ]
  }
];

// Curated past interview questions by company
export const companyQuestions = {
  "Google": {
    logo: "/logos/google.png",
    color: "#4285F4",
    questions: {
      technical: [
        {
                "question": "Given a stream of integers, design a data structure that supports inserting integers and finding the median of all elements seen so far efficiently.",
                "difficulty": "Hard",
                "sampleAnswer": "Use two heaps: a max-heap for the lower half and a min-heap for the upper half. On insertion, balance the sizes so they differ by at most 1. Finding median is O(1) by accessing heap tops, and insertion is O(log n)."
        },
        {
                "question": "Explain how Google's MapReduce framework works. How would you use it to count word frequencies across billions of web pages?",
                "difficulty": "Hard",
                "sampleAnswer": "MapReduce splits execution into Map phase emitting (word, 1) pairs and Reduce phase aggregating totals by key. Distributed workers execute concurrently with shuffle/sort handling network transfer."
        },
        {
                "question": "What are the differences between processes and threads? How does the Linux Completely Fair Scheduler (CFS) allocate CPU time?",
                "difficulty": "Medium",
                "sampleAnswer": "Processes have separate virtual address spaces while threads share memory within a process. CFS uses a red-black tree indexed by virtual runtime to guarantee proportional CPU slice allocation."
        },
        {
                "question": "How does Garbage Collection in V8 (Chrome/Node.js) work? Compare Scavenger (generational) vs Mark-Sweep-Compact.",
                "difficulty": "Hard",
                "sampleAnswer": "V8 splits heap into New Space (young generation) and Old Space. Scavenger uses Cheney's algorithm for fast allocation/collection in New Space. Surviving objects promote to Old Space using Mark-Sweep-Compact."
        },
        {
                "question": "Implement an algorithm to find the longest substring without repeating characters in O(n) time.",
                "difficulty": "Medium",
                "sampleAnswer": "Use a sliding window approach with two pointers and a HashTable storing the last seen index of each character. Advance the right pointer and shrink left pointer whenever a duplicate is encountered."
        },
        {
                "question": "Explain HTTP/3 and QUIC protocol. How does QUIC solve head-of-line blocking present in HTTP/2 TCP connections?",
                "difficulty": "Hard",
                "sampleAnswer": "HTTP/2 multiplexes streams over one TCP connection, causing single-packet loss to block all streams. QUIC runs over UDP with per-stream transport controls, connection IDs for IP mobility, and built-in TLS 1.3 encryption."
        }
],
      behavioral: [
        {
                "question": "Tell me about a time you had to push back on a product requirement because of technical constraints. How did you handle the disagreement?",
                "difficulty": "Medium",
                "sampleAnswer": "Quantified technical trade-offs (latency impact, system stability), proposed realistic phased alternatives, aligned with stakeholders on business value, and agreed on a scalable compromise."
        },
        {
                "question": "Describe a situation where you had to learn a completely new technology stack in a short timeframe. What was your approach?",
                "difficulty": "Medium",
                "sampleAnswer": "Structured learning into core fundamentals, built hands-on proof-of-concept prototypes, conducted peer code reviews, and created documentation for team onboarding."
        },
        {
                "question": "Tell me about a time when a project you were leading failed or missed its core metric. What did you learn?",
                "difficulty": "Hard",
                "sampleAnswer": "Took full accountability, led a blameless post-mortem, identified early warning signals that were overlooked, and introduced telemetry metrics to prevent recurrence."
        },
        {
                "question": "How do you prioritize tech debt vs delivering new features when product owners urge fast delivery?",
                "difficulty": "Medium",
                "sampleAnswer": "Categorized tech debt into risk impact metrics, allocated a dedicated 20% capacity per sprint for architectural maintenance, and demonstrated how reducing tech debt accelerates future delivery."
        },
        {
                "question": "Give an example of how you handled a disagreement with a senior engineer or team lead regarding system architecture.",
                "difficulty": "Hard",
                "sampleAnswer": "Focused on data rather than opinion, built small benchmarks to compare trade-offs, remained respectful of institutional context, and aligned on the overall system goals."
        },
        {
                "question": "Describe a time you mentored an underperforming team member. How did you help them improve?",
                "difficulty": "Medium",
                "sampleAnswer": "Established clear expectations, broke down tasks into manageable goals, provided weekly constructive feedback, and created pair-programming opportunities."
        }
],
      "system-design": [
        {
                "question": "Design Google Search Autocomplete. How would you serve suggestions with sub-100ms latency for billions of queries per day?",
                "difficulty": "Hard",
                "sampleAnswer": "Use a Trie prefix tree pre-computed from query logs. Shard Trie partitions across memory caches (Redis/Memcached), route via L7 load balancers, and use client-side debounce + caching."
        },
        {
                "question": "How would you design YouTube's video recommendation system? Consider scale, real-time personalization, and cold-start problems.",
                "difficulty": "Hard",
                "sampleAnswer": "Two-stage pipeline: Candidate Generation using collaborative filtering neural nets to select ~hundreds of items, followed by a Deep Neural Network Ranking model incorporating real-time context and user feedback."
        },
        {
                "question": "Design Google Drive / Docs real-time collaborative editing service supporting operational transformation or CRDTs.",
                "difficulty": "Hard",
                "sampleAnswer": "Use conflict-free replicated data types (CRDTs) or Operational Transformation (OT) over WebSockets. Maintain central state version vector in Redis/DynamoDB for persistence."
        },
        {
                "question": "Design Google Maps navigation and routing engine. How do you find the shortest path on a dynamic traffic graph?",
                "difficulty": "Hard",
                "sampleAnswer": "Segment geographic graph into hierarchical cell grids. Precompute contraction hierarchies for fast routing, update edge weights in real-time from traffic telemetry streams."
        },
        {
                "question": "Design Google Photos storage and search infrastructure supporting billions of images with auto-tagging.",
                "difficulty": "Hard",
                "sampleAnswer": "Store raw images in object storage (S3/GCS), metadata in Spanner/CockroachDB. Asynchronous ML pipeline generates embeddings stored in vector databases (Milvus/FAISS) for similarity search."
        },
        {
                "question": "Design a global distributed web crawler for indexing the internet at Google scale.",
                "difficulty": "Hard",
                "sampleAnswer": "Distributed URL frontier queue with politeness delay controls per domain. Worker nodes fetch documents, extract links, deduplicate via Bloom filters, and stream to storage pipeline."
        }
]
    }
  },
  "Amazon": {
    logo: "/logos/amazon.png",
    color: "#FF9900",
    questions: {
      technical: [
        {
                "question": "Design an LRU (Least Recently Used) Cache with O(1) get and put operations. Walk through your data structure choices.",
                "difficulty": "Medium",
                "sampleAnswer": "Combine a HashMap for O(1) key lookup with a Doubly Linked List to maintain usage ordering. Update pointers on access and evict tail on capacity breach."
        },
        {
                "question": "Explain Amazon's DynamoDB consistency models. When would you choose eventual consistency vs strong consistency?",
                "difficulty": "Hard",
                "sampleAnswer": "Eventual consistency offers lower latency and higher read throughput at 1/2 RCU cost. Strongly consistent reads access storage node quorum to guarantee latest write data at higher cost."
        },
        {
                "question": "How would you implement a distributed rate limiter for an API gateway serving millions of requests per second?",
                "difficulty": "Hard",
                "sampleAnswer": "Use Token Bucket or Sliding Window Log algorithm backed by Redis cluster with Lua scripts for atomic counter updates and TTL expiration."
        },
        {
                "question": "Given an array of integers representing stock prices per day, find the maximum profit from buying and selling stock at most twice.",
                "difficulty": "Hard",
                "sampleAnswer": "Use dynamic programming tracking 4 states: first buy, first sell, second buy, second sell. Traverse prices array once updating state variables for O(n) time and O(1) space."
        },
        {
                "question": "Explain the inner workings of AWS S3 data storage consistency and multipart upload architecture.",
                "difficulty": "Hard",
                "sampleAnswer": "S3 provides strong read-after-write consistency for PUTs and DELETEs. Multipart upload splits large files into parts uploaded concurrently, committed via complete-multipart-upload manifest."
        },
        {
                "question": "Find the median of two sorted arrays of sizes m and n in O(log(m+n)) time complexity.",
                "difficulty": "Hard",
                "sampleAnswer": "Use binary search on the smaller array to partition both arrays such that elements on left half are smaller than elements on right half."
        }
],
      behavioral: [
        {
                "question": "Tell me about a time you had to make a decision without having all the data you needed. (Bias for Action)",
                "difficulty": "Medium",
                "sampleAnswer": "Evaluated 70% data availability, assessed reversible vs irreversible nature of decision (Type 1 vs Type 2), acted swiftly, and established monitoring metrics to adjust course."
        },
        {
                "question": "Describe a time when you disagreed with your manager or team lead. (Have Backbone; Disagree and Commit)",
                "difficulty": "Medium",
                "sampleAnswer": "Presented objective data privately to support alternative view, engaged in open debate, and once leadership decided on final approach, committed 100% to execution."
        },
        {
                "question": "Tell me about a time you took calculated risks that failed. How did you react? (Calculated Risk)",
                "difficulty": "Hard",
                "sampleAnswer": "Assessed blast radius prior to rollout, implemented feature flag kill-switches, owned the post-incident remediation, and shared key learnings across team."
        },
        {
                "question": "Describe a situation where you dove deep into data to solve a complex operational bug. (Dive Deep)",
                "difficulty": "Medium",
                "sampleAnswer": "Analyzed distributed log traces across 5 microservices, identified a subtle race condition in thread pooling, and refactored synchronization locks."
        },
        {
                "question": "Give an example of a time you invented a simplified solution to a complex business problem. (Invent and Simplify)",
                "difficulty": "Medium",
                "sampleAnswer": "Replaced an overly engineered multi-service workflow with a lightweight serverless EventBridge architecture, cutting maintenance costs by 60%."
        },
        {
                "question": "Tell me about a time you delivered results under extremely tight deadlines. (Deliver Results)",
                "difficulty": "Medium",
                "sampleAnswer": "Ruthlessly prioritized core MVP features, eliminated non-essential scope, coordinated async workstreams, and delivered on-time without compromising code quality."
        }
],
      "system-design": [
        {
                "question": "Design Amazon's product recommendation engine for hundreds of millions of products and users.",
                "difficulty": "Hard",
                "sampleAnswer": "Item-to-item collaborative filtering pre-computing similarity matrices, combined with real-time session streaming events ingested via Kinesis to generate personalized candidate lists."
        },
        {
                "question": "Design a package tracking system for Amazon Logistics handling millions of parcels globally.",
                "difficulty": "Hard",
                "sampleAnswer": "Event-driven architecture streaming scan events via SQS/Kinesis into DynamoDB, using websockets for real-time customer status updates and S3+Athena for telemetry analytics."
        },
        {
                "question": "Design Amazon Prime Video streaming platform capable of handling high-concurrency live sports events.",
                "difficulty": "Hard",
                "sampleAnswer": "Adaptive Bitrate Streaming (HLS/DASH) served via multi-CDN edge architecture, origin shielding, and predictive pre-caching."
        },
        {
                "question": "Design Amazon Flash Sales / Lightning Deals flash checkout system handling 100k requests per second for limited inventory.",
                "difficulty": "Hard",
                "sampleAnswer": "Virtual waiting room queueing via Redis token buckets, optimistic locking on inventory counts in memory, decoupled order payment processing via SQS queues."
        },
        {
                "question": "Design an Amazon Fulfillment Center automated inventory allocation system.",
                "difficulty": "Hard",
                "sampleAnswer": "Graph-based spatial optimization model allocating incoming stock to nearest regional FCs based on predictive demand, carrier routes, and warehouse capacity."
        },
        {
                "question": "Design AWS IAM (Identity and Access Management) evaluation engine with microsecond latency.",
                "difficulty": "Hard",
                "sampleAnswer": "In-memory policy evaluation engine deploying compiled policy decision trees to local sidecar caches next to services."
        }
]
    }
  },
  "Meta": {
    logo: "/logos/meta.png",
    color: "#0668E1",
    questions: {
      technical: [
        {
                "question": "Given a binary tree, serialize it to a string and deserialize the string back to the original tree.",
                "difficulty": "Hard",
                "sampleAnswer": "Use pre-order traversal with a special delimiter for null nodes. Recursively rebuild tree using queue/pointer during deserialization in O(n) time."
        },
        {
                "question": "Explain React's reconciliation algorithm (Virtual DOM diffing) and why keys matter in lists.",
                "difficulty": "Medium",
                "sampleAnswer": "React uses heuristics (O(n) tree comparison): components of different types recreate subtrees, keys provide stable identities so React tracks moved items without re-rendering."
        },
        {
                "question": "Implement a sparse matrix multiplication algorithm efficiently.",
                "difficulty": "Hard",
                "sampleAnswer": "Represent matrices using Compressed Sparse Row (CSR) or HashMaps storing non-zero values to avoid computing 0*0 entries."
        },
        {
                "question": "Find the shortest path in a weighted graph with negative edge weights using Bellman-Ford algorithm.",
                "difficulty": "Medium",
                "sampleAnswer": "Relax all edges V-1 times. Run a final iteration to detect negative weight cycles."
        },
        {
                "question": "Explain JavaScript event loop, microtasks (Promises, queueMicrotask) vs macrotasks (setTimeout, setInterval).",
                "difficulty": "Medium",
                "sampleAnswer": "Event loop executes current synchronous code, drains all microtasks in queue completely, then processes one macrotask before re-evaluating rendering and microtasks."
        },
        {
                "question": "Implement a custom LRU-K cache algorithm where eviction is based on time of K-th last access.",
                "difficulty": "Hard",
                "sampleAnswer": "Maintain history queue tracking timestamps of last K accesses for each item and evict item with maximum backward K-distance."
        }
],
      behavioral: [
        {
                "question": "Tell me about a project where you had to move fast and ship something imperfect. (Move Fast)",
                "difficulty": "Medium",
                "sampleAnswer": "Scoped essential core functionality, accepted non-critical tech debt with explicit remediation tickets, launched MVP to gather user signals, and iterated quickly."
        },
        {
                "question": "Describe a time you received critical feedback that was hard to hear. How did you respond?",
                "difficulty": "Medium",
                "sampleAnswer": "Listened objectively without defensiveness, asked clarifying questions, formulated a concrete improvement action plan, and followed up for feedback."
        },
        {
                "question": "Tell me about a time you resolved an interpersonal conflict on a cross-functional team.",
                "difficulty": "Medium",
                "sampleAnswer": "Scheduled 1-on-1 conversations to understand perspective, focused discussion on objective user outcomes, and agreed on shared metrics."
        },
        {
                "question": "Describe a project where you took full ownership from concept to production release.",
                "difficulty": "Medium",
                "sampleAnswer": "Authored technical RFC, conducted security/privacy reviews, led engineering execution, and monitored metrics post-launch."
        },
        {
                "question": "Tell me about a time you had to pivot your project direction due to changing company priorities.",
                "difficulty": "Medium",
                "sampleAnswer": "Evaluated reusable modules from current project, communicated transparently with team, and seamlessly transitioned context to new goal."
        },
        {
                "question": "Describe a situation where you identified a security or privacy vulnerability in existing code.",
                "difficulty": "Hard",
                "sampleAnswer": "Patched vulnerability immediately, conducted audit across codebase for similar patterns, and added static analysis rules to prevent future occurrences."
        }
],
      "system-design": [
        {
                "question": "Design Facebook's News Feed. How would you handle ranking and real-time updates for billions of users?",
                "difficulty": "Hard",
                "sampleAnswer": "Hybrid push-pull model: Push fan-out on write for low-follower accounts, pull on read for high-follower accounts. TAO graph DB for social graph and Memcached for feeds."
        },
        {
                "question": "Design Instagram Stories — ephemeral content that disappears after 24 hours.",
                "difficulty": "Hard",
                "sampleAnswer": "Store media in object storage (S3) behind CDN. Metadata stored in key-value store with TTL set to 24h. Maintain pre-sorted user story trays in memory."
        },
        {
                "question": "Design WhatsApp messaging platform supporting end-to-end encryption and offline message delivery.",
                "difficulty": "Hard",
                "sampleAnswer": "Long-lived WebSocket connections, Signal Protocol for E2EE keys, transient message queues storing encrypted payloads until delivery confirmation."
        },
        {
                "question": "Design Facebook Messenger live location sharing service for millions of active users.",
                "difficulty": "Hard",
                "sampleAnswer": "Geohash indexing with Redis geospatial data structures streaming location coordinates over WebSockets to authorized friends."
        },
        {
                "question": "Design Meta Ads auction and bidding system processing millions of ad placements per second.",
                "difficulty": "Hard",
                "sampleAnswer": "Distributed real-time bidding engine calculating Expected Value (eCPM = Bid * CTR * CVR) with low-latency candidate retrieval and budget pacing."
        },
        {
                "question": "Design Facebook Live streaming infrastructure for multi-million concurrent viewers.",
                "difficulty": "Hard",
                "sampleAnswer": "RTMP ingestion streams converted to HLS/DASH fragments distributed via multi-tiered CDN edge trees with adaptive resolution ladders."
        }
]
    }
  },
  "Apple": {
    logo: "/logos/apple.png",
    color: "#A2AAAD",
    questions: {
      technical: [
        {
                "question": "Explain the differences between stack and heap memory allocation. How does ARC work in Swift?",
                "difficulty": "Medium",
                "sampleAnswer": "Stack memory is fast LIFO allocation for value types. Heap is dynamic allocation for reference types. ARC inserts compile-time retain/release calls, freeing memory when count reaches 0."
        },
        {
                "question": "How would you optimize a mobile app to reduce battery consumption while maintaining real-time data sync?",
                "difficulty": "Hard",
                "sampleAnswer": "Batch network requests, replace continuous polling with push notifications, use location change APIs instead of continuous GPS, defer non-urgent tasks to charging periods."
        },
        {
                "question": "Explain Metal API vs OpenGL ES graphics rendering pipeline on iOS devices.",
                "difficulty": "Hard",
                "sampleAnswer": "Metal provides low-overhead direct GPU control, pre-compiled pipeline state objects, and explicit command buffer queues maximizing hardware utilization."
        },
        {
                "question": "Implement a memory-efficient Data Structure to store and query Millions of IP addresses.",
                "difficulty": "Medium",
                "sampleAnswer": "Use a Trie (Radix tree) where each level represents bits of the IP address, allowing O(1) IP lookup and prefix matching."
        },
        {
                "question": "Explain iOS App Lifecycle states and how background execution memory limits are managed.",
                "difficulty": "Medium",
                "sampleAnswer": "States: Not Running, Inactive, Active, Background, Suspended. System reclaims suspended app memory during pressure via didReceiveMemoryWarning."
        },
        {
                "question": "Implement concurrent thread-safe Read-Write Lock in Swift or C++.",
                "difficulty": "Hard",
                "sampleAnswer": "Use pthread_rwlock or GCD dispatch queue with barrier flags allowing concurrent reads and exclusive write barriers."
        }
],
      behavioral: [
        {
                "question": "Tell me about a product you use daily that you think has a design flaw. How would you fix it?",
                "difficulty": "Medium",
                "sampleAnswer": "Identified friction point, analyzed user impact, proposed minimalist user experience solution, and evaluated accessibility trade-offs."
        },
        {
                "question": "Describe a time when you had to maintain extremely high quality standards under pressure.",
                "difficulty": "Medium",
                "sampleAnswer": "Focused on non-negotiable UX polish and core stability, established strict automated testing barriers, and refused to ship compromise solutions."
        },
        {
                "question": "Tell me about a time you simplified a complex feature to make it intuitive for non-technical users.",
                "difficulty": "Medium",
                "sampleAnswer": "Removed unnecessary configuration options, abstracted background processing, and focused UI on clear primary user actions."
        },
        {
                "question": "Describe a situation where you had to work with a cross-functional team with conflicting priorities.",
                "difficulty": "Medium",
                "sampleAnswer": "Aligned hardware, software, and design teams around customer experience goals through regular syncs and prototype demonstrations."
        },
        {
                "question": "Tell me about a time you caught a critical edge-case bug right before product launch.",
                "difficulty": "Hard",
                "sampleAnswer": "Uncovered memory leak during boundary testing, created minimal reproduction case, implemented patch, and verified regression suites."
        },
        {
                "question": "Why do you want to work at Apple specifically over other tech companies?",
                "difficulty": "Easy",
                "sampleAnswer": "Emphasized passion for hardware-software integration, relentless obsession with customer privacy, design craftsmanship, and long-term quality."
        }
],
      "system-design": [
        {
                "question": "Design iCloud Photo Library — syncing millions of photos across devices with offline conflict resolution.",
                "difficulty": "Hard",
                "sampleAnswer": "SQLite local metadata database with vector clocks for change tracking. Differential sync Engine uploading original binaries to cloud object store with thumbnail pre-generation."
        },
        {
                "question": "Design Apple iMessage service ensuring end-to-end encryption across multiple user devices.",
                "difficulty": "Hard",
                "sampleAnswer": "Per-device public-private key pairs registered in Key Transparency log. Sender encrypts payload separately for every target device."
        },
        {
                "question": "Design Apple Push Notification service (APNs) handling billions of notifications per day.",
                "difficulty": "Hard",
                "sampleAnswer": "Persistent TLS TCP connections maintained between devices and APNs edge gateways. Routing lookup via device token hash table."
        },
        {
                "question": "Design Apple Pay tokenization and secure enclave transaction processing system.",
                "difficulty": "Hard",
                "sampleAnswer": "Hardware Secure Enclave generates Device Account Number (DAN) dynamic cryptograms, sent to Payment Network (Visa/Mastercard) for token translation."
        },
        {
                "question": "Design Apple AirTag Find My network utilizing crowdsourced BLE devices securely.",
                "difficulty": "Hard",
                "sampleAnswer": "AirTag broadcasts rotating public keys via Bluetooth LE. Nearby Apple devices encrypt their current location using AirTag's public key and upload to cloud without knowing AirTag identity."
        },
        {
                "question": "Design Apple Music streaming and offline caching service for millions of tracks.",
                "difficulty": "Hard",
                "sampleAnswer": "Encrypted FairPlay DRM audio files stored on global CDN. Local device encrypted cache managed with LRU strategy."
        }
]
    }
  },
  "Netflix": {
    logo: "/logos/netflix.png",
    color: "#E50914",
    questions: {
      technical: [
        {
                "question": "Explain how Netflix implements Adaptive Bitrate Streaming (ABR) using DASH/HLS.",
                "difficulty": "Hard",
                "sampleAnswer": "Video encoded at multiple resolution/bitrate ladders. Client ABR algorithm monitors buffer health and network throughput to dynamically request optimal video chunk segments."
        },
        {
                "question": "How does Netflix handle microservice failures at scale? Explain circuit breakers and bulkheads.",
                "difficulty": "Medium",
                "sampleAnswer": "Circuit breakers fail fast when error thresholds are exceeded, returning fallback responses. Bulkheads isolate thread pools so single service slowdowns don't exhaust node resources."
        },
        {
                "question": "Implement an algorithm to optimize video chunk pre-fetching based on user viewing probability.",
                "difficulty": "Hard",
                "sampleAnswer": "Calculate transition probability matrix across titles/episodes and enqueue top-N probable next chunks into background fetch worker queue."
        },
        {
                "question": "Explain Chaos Engineering (Chaos Monkey) principles and how fault injection works in production.",
                "difficulty": "Medium",
                "sampleAnswer": "Intentionally terminate production instances and inject network latency during business hours to verify system auto-healing and resilience."
        },
        {
                "question": "Implement a concurrency-limiting algorithm for microservice requests using Token Bucket or Semaphore.",
                "difficulty": "Medium",
                "sampleAnswer": "Use atomic integer counters or acquire/release semaphores to cap maximum concurrent in-flight requests, instantly rejecting excess load."
        },
        {
                "question": "Explain Zero-copy networking in Java/Linux (transferTo / sendfile) used in high-throughput video streaming.",
                "difficulty": "Hard",
                "sampleAnswer": "Bypasses copying data between kernel buffer and user space memory by transferring bytes directly from file descriptor to network socket buffer."
        }
],
      behavioral: [
        {
                "question": "Netflix values 'Freedom and Responsibility.' Tell me about a time you took significant ownership without being asked.",
                "difficulty": "Medium",
                "sampleAnswer": "Identified system bottleneck independently, designed refactoring solution, coordinated migration with dependent teams, and monitored post-release impact."
        },
        {
                "question": "Tell me about a time you had to give candid feedback to a colleague or supervisor. (Context Not Control)",
                "difficulty": "Medium",
                "sampleAnswer": "Delivered actionable feedback directly and respectfully in private, focused on business impact, and suggested constructive next steps."
        },
        {
                "question": "Describe a situation where you had to make a tough business decision that prioritized long-term goals over short-term gains.",
                "difficulty": "Hard",
                "sampleAnswer": "Deprecating a widely-used legacy feature to unblock core architecture overhaul, managing customer communications and migration paths."
        },
        {
                "question": "Tell me about a project where you eliminated unnecessary process or bureaucracy to accelerate delivery.",
                "difficulty": "Medium",
                "sampleAnswer": "Replaced 5 manual approval gates with automated CI/CD security scans and canary release monitoring."
        },
        {
                "question": "Describe a time when you made a mistake due to high autonomy. How did you take responsibility?",
                "difficulty": "Medium",
                "sampleAnswer": "Owned the mistake immediately, remediated issue, conducted post-mortem, and shared learnings openly with team."
        },
        {
                "question": "Why does Netflix's culture memo resonate with your personal work philosophy?",
                "difficulty": "Easy",
                "sampleAnswer": "Highlighted passion for high talent density, stunning colleagues, radical candor, and accountability over micro-management."
        }
],
      "system-design": [
        {
                "question": "Design Open Connect — Netflix's custom CDN server architecture for global video delivery.",
                "difficulty": "Hard",
                "sampleAnswer": "Deploy custom hardware appliances inside ISP networks, pre-loading popular titles during off-peak hours and routing users via DNS steering."
        },
        {
                "question": "Design a real-time A/B testing platform capable of running thousands of simultaneous experiments across 200M+ users.",
                "difficulty": "Hard",
                "sampleAnswer": "Hash user ID + experiment key to assign variant cells. Real-time event streaming pipeline computes metric impact with automated statistical significance checks."
        },
        {
                "question": "Design Netflix's personalized artwork thumbnail generation and selection engine.",
                "difficulty": "Hard",
                "sampleAnswer": "Extract key frames from video, train contextual multi-armed bandit models per user segment to serve thumbnail images that maximize click-through rate."
        },
        {
                "question": "Design Netflix's user profile and watch history management system across devices.",
                "difficulty": "Hard",
                "sampleAnswer": "Partitioned Cassandra datastore using composite keys (user_id, timestamp) for rapid append of view events with Redis caching."
        },
        {
                "question": "Design Netflix download service for offline viewing on mobile devices with DRM validation.",
                "difficulty": "Hard",
                "sampleAnswer": "Generate temporary DRM licenses tied to device hardware ID, storing encrypted chunk payloads locally with expiration timers."
        },
        {
                "question": "Design Netflix billing and subscription lifecycle management system with global payment gateway fallbacks.",
                "difficulty": "Hard",
                "sampleAnswer": "Idempotent payment processing pipeline with retry strategies, fallback PSP routing, and state machine managing active/grace/canceled subscription states."
        }
]
    }
  },
  "Microsoft": {
    logo: "/logos/microsoft.svg",
    color: "#00A4EF",
    questions: {
      technical: [
        {
                "question": "Explain CAP theorem and map Azure Cosmos DB's 5 consistency levels to it.",
                "difficulty": "Hard",
                "sampleAnswer": "CAP trades Consistency vs Availability under Partitions. Cosmos DB offers Strong, Bounded Staleness, Session, Consistent Prefix, and Eventual consistency levels."
        },
        {
                "question": "What is Dependency Injection in .NET Core? Explain Scoped vs Transient vs Singleton lifetimes.",
                "difficulty": "Medium",
                "sampleAnswer": "DI decouples object creation. Singleton: single instance lifetime. Scoped: created per HTTP request. Transient: new instance created per resolution."
        },
        {
                "question": "Implement a thread-safe Async AutoResetEvent or Mutex in C#.",
                "difficulty": "Hard",
                "sampleAnswer": "Use SemaphoreSlim or TaskCompletionSource queue tracking waiting callers to grant signal releases asynchronously without blocking OS threads."
        },
        {
                "question": "Explain garbage collection in .NET (Gen 0, Gen 1, Gen 2, Large Object Heap).",
                "difficulty": "Medium",
                "sampleAnswer": "Gen 0: short-lived objects. Gen 1: buffer space between Gen 0 and Gen 2. Gen 2 & LOH (>85k bytes): long-lived objects collected during full GC compaction."
        },
        {
                "question": "Implement an algorithm to find the lowest common ancestor (LCA) in a Binary Tree with parent pointers.",
                "difficulty": "Medium",
                "sampleAnswer": "Calculate depths of both nodes, advance deeper node up to matching depth, then traverse both node pointers upward together until match."
        },
        {
                "question": "Explain C# async/await internals, Task execution context, and SynchronizationContext.",
                "difficulty": "Hard",
                "sampleAnswer": "Compiler transforms async methods into state machines. await registers continuations on Task; SynchronizationContext marshals execution back to UI thread when required."
        }
],
      behavioral: [
        {
                "question": "Tell me about a time you collaborated with a team in a different timezone or culture.",
                "difficulty": "Medium",
                "sampleAnswer": "Established async communication protocols, documented decisions in central wiki, scheduled overlapping office hours, and respected cultural communication norms."
        },
        {
                "question": "Describe a time you mentored someone and helped them adopt a Growth Mindset.",
                "difficulty": "Medium",
                "sampleAnswer": "Encouraged viewing failures as learning data points, set incremental goals, provided regular constructive feedback, and celebrated skill progression."
        },
        {
                "question": "Tell me about a time you had to pivot a product feature based on customer telemetry data.",
                "difficulty": "Medium",
                "sampleAnswer": "Analyzed usage metrics showing low adoption of complex configuration UI, simplified workflow to one-click default, increasing feature engagement by 3x."
        },
        {
                "question": "Describe a situation where you had to balance backward compatibility while upgrading a legacy SDK.",
                "difficulty": "Hard",
                "sampleAnswer": "Introduced side-by-side versioning, marked legacy APIs with deprecation warnings, provided automated migration scripts, and supported multi-year deprecation window."
        },
        {
                "question": "Give an example of how you demonstrated empathy towards a customer experiencing system outages.",
                "difficulty": "Medium",
                "sampleAnswer": "Communicated transparent hourly updates, prioritized emergency hotfix deployment, and provided root cause post-mortem analysis."
        },
        {
                "question": "Why Microsoft? How do you connect with Microsoft's mission to empower every person and organization?",
                "difficulty": "Easy",
                "sampleAnswer": "Highlighted alignment with inclusive technology design, global platform reach, open source commitment, and empowering productivity across diverse industries."
        }
],
      "system-design": [
        {
                "question": "Design Microsoft Teams' real-time messaging and presence system for enterprise users.",
                "difficulty": "Hard",
                "sampleAnswer": "WebSocket gateway connections sharded by tenant, message store in Cosmos DB, presence heartbeats aggregated via distributed Redis memory grid."
        },
        {
                "question": "Design OneDrive cloud file sync engine supporting delta sync and block-level diffing.",
                "difficulty": "Hard",
                "sampleAnswer": "Chunk files into rolling hash blocks (Rabin fingerprints), upload only modified blocks, reconstruct files server-side, resolve conflicts with version trees."
        },
        {
                "question": "Design Azure Event Hubs / Service Bus for ingestion of trillions of events per day.",
                "difficulty": "Hard",
                "sampleAnswer": "Partitioned log architecture with persistent append-only storage, offset-based consumer groups, and TCP AMQP protocol ingestion servers."
        },
        {
                "question": "Design Microsoft Xbox Live matchmaking system for online multiplayer games.",
                "difficulty": "Hard",
                "sampleAnswer": "TrueSkill rating system calculating skill distributions, matching players in queue within expanding latency and skill bounds."
        },
        {
                "question": "Design GitHub Codespaces / Azure Cloud Shell instant cloud developer environment platform.",
                "difficulty": "Hard",
                "sampleAnswer": "Pre-warmed container pools hosted on Kubernetes nodes, mounting persistent block storage (EBS/Azure Disk) dynamically on connection."
        },
        {
                "question": "Design Office 365 co-authoring document sync platform (Word/Excel online).",
                "difficulty": "Hard",
                "sampleAnswer": "Fluid Framework tree-based data structures using delta ops distributed across WebSockets with server-assisted convergence."
        }
]
    }
  },
  "Oracle": {
    logo: "/logos/oracle.png",
    color: "#F80000",
    questions: {
      technical: [
        {
                "question": "Explain Clustered vs Non-Clustered Indexes in Relational Databases (Oracle DB / MySQL).",
                "difficulty": "Medium",
                "sampleAnswer": "Clustered index determines physical storage order of rows (1 per table). Non-clustered index is a separate structure containing pointers to physical data locations."
        },
        {
                "question": "What are Database Isolation levels? Explain Dirty Reads, Non-Repeatable Reads, and Phantom Reads.",
                "difficulty": "Hard",
                "sampleAnswer": "Read Uncommitted (allows all anomalies), Read Committed (prevents dirty reads), Repeatable Read (prevents non-repeatable reads), Serializable (prevents phantom reads)."
        },
        {
                "question": "Explain Multi-Version Concurrency Control (MVCC) in Oracle Database.",
                "difficulty": "Hard",
                "sampleAnswer": "Oracle uses undo segments to maintain historical snapshots of modified rows, allowing readers to access consistent data states without acquiring lock blocks."
        },
        {
                "question": "Implement B-Tree insertion and node splitting algorithm logic.",
                "difficulty": "Hard",
                "sampleAnswer": "Insert item into sorted leaf node. If node exceeds M-1 keys, split into two nodes and push median key up to parent recursively."
        },
        {
                "question": "Explain Database Connection Pooling (HikariCP / Oracle UCP) configuration and leak detection.",
                "difficulty": "Medium",
                "sampleAnswer": "Connection pools maintain open database sockets. Parameters: minIdle, maxPoolSize, connectionTimeout, leakDetectionThreshold tracking unclosed connections."
        },
        {
                "question": "Explain Write-Ahead Logging (WAL) / Redo Logging for database durability and crash recovery.",
                "difficulty": "Hard",
                "sampleAnswer": "Changes are appended to WAL before data pages are flushed to disk. During crash recovery, REDO phase replays committed logs and UNDO rolls back uncommitted transactions."
        }
],
      behavioral: [
        {
                "question": "Tell me about a time you had to debug a critical production database outage under high pressure.",
                "difficulty": "Medium",
                "sampleAnswer": "Analyzed slow query logs, identified missing index causing table scans, applied online index build, and restored system performance."
        },
        {
                "question": "Describe a project where you migrated legacy database schemas to modern cloud-native architectures.",
                "difficulty": "Hard",
                "sampleAnswer": "Refactored monolithic schemas into domain boundary databases, utilized CDC tools for zero-downtime data replication, and validated data integrity."
        },
        {
                "question": "Tell me about a time you had to negotiate technical requirements with enterprise customers.",
                "difficulty": "Medium",
                "sampleAnswer": "Listened to business constraints, presented security and compliance guarantees, and agreed on phased deployment milestones."
        },
        {
                "question": "Describe a situation where you optimized resource utilization to cut cloud infrastructure costs.",
                "difficulty": "Medium",
                "sampleAnswer": "Identified over-provisioned database instances, implemented auto-scaling policies, and right-sized compute nodes saving 35% monthly costs."
        },
        {
                "question": "Tell me about a time you had to enforce strict code quality or database security practices on your team.",
                "difficulty": "Medium",
                "sampleAnswer": "Automated SQL injection vulnerability scans in CI/CD pipeline and required mandatory database migration script code reviews."
        },
        {
                "question": "Why Oracle Cloud Infrastructure (OCI) and enterprise software systems?",
                "difficulty": "Easy",
                "sampleAnswer": "Expressed enthusiasm for high-performance bare-metal cloud infrastructure, Autonomous Database innovations, and enterprise mission-critical workloads."
        }
],
      "system-design": [
        {
                "question": "Design a Multi-tenant SaaS Database Architecture supporting thousands of enterprise customers.",
                "difficulty": "Hard",
                "sampleAnswer": "Evaluated Database-per-tenant vs Schema-per-tenant vs Shared-schema with tenant_id. Selected hybrid tiering with tenant-aware connection pooling and encryption keys."
        },
        {
                "question": "Design Oracle Autonomous Database auto-scaling and self-healing cloud control plane.",
                "difficulty": "Hard",
                "sampleAnswer": "Control plane monitors CPU/memory metrics via telemetry agents, dynamically resizes container cgroups without downtime, and auto-applies security patches."
        },
        {
                "question": "Design a high-throughput Change Data Capture (CDC) streaming pipeline for real-time data replication.",
                "difficulty": "Hard",
                "sampleAnswer": "Parse database transaction logs (Oracle LogMiner), publish change events to Kafka streams, consume into target data warehouses idempotently."
        },
        {
                "question": "Design a global Cloud Object Storage system with cross-region disaster recovery replication.",
                "difficulty": "Hard",
                "sampleAnswer": "Storage nodes organized in storage pools using Erasure Coding (e.g. 8+4 scheme). Asynchronous cross-region replication queue for disaster recovery."
        },
        {
                "question": "Design an Enterprise Resource Planning (ERP) financial auditing and ledger system.",
                "difficulty": "Hard",
                "sampleAnswer": "Immutable double-entry ledger database schema, cryptographically chained transaction entries, append-only logs with strict ACID guarantees."
        },
        {
                "question": "Design an enterprise Data Warehouse query optimizer engine.",
                "difficulty": "Hard",
                "sampleAnswer": "Cost-based optimizer evaluating table statistics, index selectivity, join algorithms (Hash Join, Nested Loop, Sort-Merge), generating optimal execution trees."
        }
]
    }
  },
  "Deloitte": {
    logo: "/logos/deloitte.svg",
    color: "#86BC25",
    questions: {
      technical: [
        {
                "question": "A retail client wants to migrate from on-premise SAP to AWS/Azure cloud. How do you approach the migration strategy?",
                "difficulty": "Hard",
                "sampleAnswer": "Conduct discovery assessment of landscape dependencies, evaluate 6 R's (Lift-and-shift vs Re-platform vs Greenfield), design phased cutover with parallel execution."
        },
        {
                "question": "Explain Enterprise Application Integration (EAI) patterns: ESB vs API Gateway vs Event-Driven Microservices.",
                "difficulty": "Medium",
                "sampleAnswer": "ESB provides centralized XML transformation (legacy). API Gateway handles edge routing, auth, rate limiting. Event-driven microservices decouple components via pub/sub queues."
        },
        {
                "question": "How do you conduct a Cloud Security and Compliance Audit for a Healthcare client (HIPAA)?",
                "difficulty": "Hard",
                "sampleAnswer": "Audit data encryption in-transit/at-rest, verify IAM least privilege policies, inspect immutable access audit logging, and conduct vulnerability penetration tests."
        },
        {
                "question": "Explain Data Governance framework implementation: Data Catalog, Metadata Management, and Data Lineage.",
                "difficulty": "Medium",
                "sampleAnswer": "Implement automated data discovery catalogs (Collibra/Alation), establish business glossary terms, track data lineage from ingestion to BI dashboards."
        },
        {
                "question": "Explain DevOps maturity assessment and metrics (DORA metrics: Deployment Frequency, Lead Time, CFR, MTTR).",
                "difficulty": "Medium",
                "sampleAnswer": "Measure baseline DORA metrics, introduce automated testing/CI/CD pipelines to improve Deployment Frequency and reduce Mean Time To Recovery (MTTR)."
        },
        {
                "question": "How would you design a Legacy System Modernization roadmap for a mainframe banking client?",
                "difficulty": "Hard",
                "sampleAnswer": "Apply Strangler Fig pattern: encapsulate mainframe using REST API wrappers, incrementally extract domain modules to cloud microservices."
        }
],
      behavioral: [
        {
                "question": "Tell me about a time you had to manage competing priorities from multiple client stakeholders.",
                "difficulty": "Medium",
                "sampleAnswer": "Facilitated alignment workshops, established impact vs effort prioritization matrix, and communicated transparent trade-offs to manage expectations."
        },
        {
                "question": "Describe a time when you had to deliver difficult news (project delay/scope change) to a client executive.",
                "difficulty": "Medium",
                "sampleAnswer": "Prepared data-backed risk analysis beforehand, presented root cause transparently alongside 2 actionable mitigation plans, maintaining trust."
        },
        {
                "question": "How do you handle a situation where a client insists on a technical solution that you know is suboptimal?",
                "difficulty": "Hard",
                "sampleAnswer": "Validated client's underlying business goal, presented comparative total-cost-of-ownership (TCO) analysis, and demonstrated proof-of-concept alternative."
        },
        {
                "question": "Tell me about a time you led a cross-functional team under tight consulting project deadlines.",
                "difficulty": "Medium",
                "sampleAnswer": "Defined clear workstream deliverables, established daily blocker removal standups, and fostered collaborative team culture."
        },
        {
                "question": "Describe a project where you had to quickly adapt to an unfamiliar client industry domain.",
                "difficulty": "Medium",
                "sampleAnswer": "Conducted intensive domain research, interviewed key subject matter experts, and built domain glossary to ramp up within one week."
        },
        {
                "question": "Why Deloitte Consulting? What draws you to Technology Consulting at Deloitte?",
                "difficulty": "Easy",
                "sampleAnswer": "Highlighted breadth of digital transformation engagements, commitment to client impact, multidisciplinary culture, and continuous learning ecosystem."
        }
],
      "system-design": [
        {
                "question": "Design a Real-Time Fraud Detection System for a global payment processing client.",
                "difficulty": "Hard",
                "sampleAnswer": "Kafka streaming event pipeline feeding real-time Flink ML evaluation engine, matching transaction features against vector feature stores with fallback manual review queue."
        },
        {
                "question": "Design an Enterprise Supply Chain Visibility Platform tracking inventory across global suppliers.",
                "difficulty": "Hard",
                "sampleAnswer": "IoT sensor telemetry streams ingested into cloud event hub, stored in time-series database with GraphQL API layer supplying vendor dashboards."
        },
        {
                "question": "Design a Customer 360 Data Platform consolidating data from 20+ disparate CRM and legacy ERP systems.",
                "difficulty": "Hard",
                "sampleAnswer": "Extract via CDC into Data Lakehouse (Delta Lake), run Master Data Management (MDM) identity resolution pipelines, serve golden record via unified API."
        },
        {
                "question": "Design a Smart City Traffic Management system processing real-time camera feeds and sensor data.",
                "difficulty": "Hard",
                "sampleAnswer": "Edge computing nodes processing video feeds for vehicle counts, streaming metadata metrics to central control system for dynamic traffic light timing."
        },
        {
                "question": "Design a global Telehealth and Remote Patient Monitoring platform complying with HIPAA.",
                "difficulty": "Hard",
                "sampleAnswer": "E2EE WebRTC video streaming, encrypted patient vitals telemetry data pipeline, HIPAA-compliant access control and audit logging."
        },
        {
                "question": "Design an Automated Claims Processing System for an insurance client using Intelligent Automation.",
                "difficulty": "Hard",
                "sampleAnswer": "OCR/Document AI ingests paper claims, Business Rules Engine auto-adjudicates low-risk claims, routing complex claims to human adjusters."
        }
]
    }
  },
  "PwC": {
    logo: "/logos/pwc.svg",
    color: "#D93F0B",
    questions: {
      technical: [
        {
                "question": "A financial services client needs a Data Governance and Data Quality monitoring framework. How do you structure it?",
                "difficulty": "Hard",
                "sampleAnswer": "Define data ownership roles, establish data quality metrics (completeness, accuracy, timeliness), implement Great Expectations/Soda quality gates in pipelines."
        },
        {
                "question": "Explain Cloud Financial Operations (FinOps) principles for managing and optimizing multi-cloud spend.",
                "difficulty": "Medium",
                "sampleAnswer": "Inform (tagging & cost allocation), Optimize (right-sizing & reserved instances), Operate (automated auto-scaling and budget alert policies)."
        },
        {
                "question": "How do you audit an AI/ML model for Algorithmic Bias and Explainability (XAI) for a banking client?",
                "difficulty": "Hard",
                "sampleAnswer": "Utilize SHAP/LIME frameworks for feature importance attribution, run demographic parity checks across sensitive features, and document model cards."
        },
        {
                "question": "Explain Zero Trust Architecture (ZTA) pillars: Identity, Devices, Networks, Applications, Data.",
                "difficulty": "Medium",
                "sampleAnswer": "Never trust, always verify: continuous identity authentication, device posture checks, micro-segmentation, and data encryption at all levels."
        },
        {
                "question": "How would you design a Disaster Recovery (DR) strategy with RPO < 5 mins and RTO < 15 mins?",
                "difficulty": "Hard",
                "sampleAnswer": "Implement Active-Passive cross-region multi-region database replication (Aurora Global / Cosmos DB), automated DNS failover via Route53 health checks."
        },
        {
                "question": "Explain Microservices Data Management patterns: Saga Pattern vs Two-Phase Commit (2PC).",
                "difficulty": "Hard",
                "sampleAnswer": "2PC uses blocking coordinator (low availability). Saga uses sequence of local transactions with compensating transactions for rollback on failure."
        }
],
      behavioral: [
        {
                "question": "Tell me about a time you worked with a client team that was resistant to digital transformation change.",
                "difficulty": "Medium",
                "sampleAnswer": "Identified client pain points, conducted hands-on training workshops, demonstrated quick win automation benefits, and empowered internal champions."
        },
        {
                "question": "Describe a situation where you identified a major project risk that others overlooked.",
                "difficulty": "Medium",
                "sampleAnswer": "Formulated risk assessment document detailing dependency vulnerabilities, presented to project board, and established mitigation action plan."
        },
        {
                "question": "Tell me about a time you had to manage team morale during an intense project crunch period.",
                "difficulty": "Medium",
                "sampleAnswer": "Maintained transparent communication, rebalanced work distribution, recognized individual contributions, and prioritized team wellbeing."
        },
        {
                "question": "Describe a project where you translated complex technical analytics into strategic business recommendations for executive leadership.",
                "difficulty": "Medium",
                "sampleAnswer": "Created executive dashboard summaries avoiding technical jargon, focused presentation on ROI impact, driving strategic investment decision."
        },
        {
                "question": "Tell me about a time you failed to meet a client deliverable milestone. How did you handle it?",
                "difficulty": "Hard",
                "sampleAnswer": "Notified client in advance with revised timeline, took accountability, deployed additional senior resources, and delivered high-quality work."
        },
        {
                "question": "Why PwC? How do your career aspirations align with PwC's purpose to build trust in society?",
                "difficulty": "Easy",
                "sampleAnswer": "Expressed commitment to building trusted technology solutions, data privacy, responsible AI practices, and collaborative client culture."
        }
],
      "system-design": [
        {
                "question": "Design an Enterprise Reporting and Analytics Platform for a multinational bank spanning 30 countries.",
                "difficulty": "Hard",
                "sampleAnswer": "CDC pipeline feeding Snowflake data warehouse, semantic metric layer, role-based row-level security enforcing country data sovereignty laws."
        },
        {
                "question": "Design a Central Bank Digital Currency (CBDC) ledger system supporting high-throughput retail transactions.",
                "difficulty": "Hard",
                "sampleAnswer": "Distributed ledger technology (DLT) or high-performance permissioned blockchain with Byzantine Fault Tolerant consensus."
        },
        {
                "question": "Design a Regulatory Risk and Compliance Monitoring system parsing global financial regulatory updates.",
                "difficulty": "Hard",
                "sampleAnswer": "NLP web scrapers ingesting regulatory publications, LLM classification categorizing rule changes, mapping updates to internal compliance policy graph."
        },
        {
                "question": "Design an Enterprise Identity and Access Governance (IAG) platform managing access rights for 100k employees.",
                "difficulty": "Hard",
                "sampleAnswer": "Role-Based and Attribute-Based Access Control (RBAC/ABAC), automated recertification workflows, integration with Okta/Azure AD."
        },
        {
                "question": "Design an Environmental Risk Assessment Platform calculating climate risk scores for commercial real estate portfolios.",
                "difficulty": "Hard",
                "sampleAnswer": "Geospatial GIS data ingestion, climate simulation model integration, spatial data queries evaluating portfolio risk exposure."
        },
        {
                "question": "Design an Anti-Money Laundering (AML) Transaction Monitoring engine handling billions of daily banking events.",
                "difficulty": "Hard",
                "sampleAnswer": "Streaming graph database (Neo4j/TigerGraph) analyzing multi-hop money transfers to detect layering techniques and suspicious rings."
        }
]
    }
  },
  "EY": {
    logo: "/logos/ey.svg",
    color: "#FFE600",
    questions: {
      technical: [
        {
                "question": "Explain the difference between RPA (Robotic Process Automation) and Intelligent Automation. When do you recommend each?",
                "difficulty": "Medium",
                "sampleAnswer": "RPA automates rule-based repetitive tasks via UI macros. Intelligent Automation incorporates AI/ML (NLP, OCR, Decision Models) for complex unstructured processes."
        },
        {
                "question": "How do you design a Cloud Data Encryption strategy covering Data in Transit, at Rest, and in Use?",
                "difficulty": "Hard",
                "sampleAnswer": "Transit: TLS 1.3. Rest: AES-256 with KMS customer-managed keys. In Use: Confidential Computing using hardware enclaves (AWS Nitro Enclaves / Azure SGX)."
        },
        {
                "question": "Explain API-First Design strategy and OpenAPI (Swagger) specification lifecycle.",
                "difficulty": "Medium",
                "sampleAnswer": "Define API contracts using OpenAPI spec before coding, allowing frontend and backend teams to develop concurrently against mock servers."
        },
        {
                "question": "How do you implement Continuous Security (DevSecOps) in CI/CD software pipelines?",
                "difficulty": "Medium",
                "sampleAnswer": "Embed SAST (Static Analysis), DAST (Dynamic Testing), Dependency Vulnerability Scanning (Snyk), and Container Image Scanning into pipeline gates."
        },
        {
                "question": "Explain Cloud-Native Architecture characteristics: 12-Factor App methodology.",
                "difficulty": "Hard",
                "sampleAnswer": "Principles including Codebase parity, Explicit dependencies, Environment Config separation, Stateless backing services, Disposability, and Logs as event streams."
        },
        {
                "question": "Explain GraphQL vs REST API architecture trade-offs for enterprise mobile applications.",
                "difficulty": "Medium",
                "sampleAnswer": "GraphQL eliminates over-fetching/under-fetching via single request schema queries, but introduces complex backend query caching and rate limiting challenges."
        }
],
      behavioral: [
        {
                "question": "Tell me about a time you had to build trust with a skeptical client or stakeholder.",
                "difficulty": "Medium",
                "sampleAnswer": "Listened actively to concerns, delivered immediate small quick-win solutions, maintained transparent progress communication, building long-term trust."
        },
        {
                "question": "Describe a project where you made a mistake or experienced a setback. What did you learn?",
                "difficulty": "Medium",
                "sampleAnswer": "Owned mistake transparently, implemented corrective action, conducted post-mortem, and shared preventive measures across team."
        },
        {
                "question": "Tell me about a time you managed a team through a complex technology transition.",
                "difficulty": "Medium",
                "sampleAnswer": "Provided clear vision roadmap, facilitated hands-on upskilling workshops, paired senior engineers with juniors, ensuring smooth adoption."
        },
        {
                "question": "Describe a situation where you had to balance technical elegance with project budget constraints.",
                "difficulty": "Medium",
                "sampleAnswer": "Focused on core business requirements, selected pragmatic scalable architecture, and deferred nice-to-have optimizations to future phases."
        },
        {
                "question": "Tell me about a time you received constructive criticism from a client manager. How did you adapt?",
                "difficulty": "Medium",
                "sampleAnswer": "Accepted feedback professionally, adjusted communication style to match client preference, and validated improvement in subsequent check-in."
        },
        {
                "question": "Why EY Building a Better Working World philosophy?",
                "difficulty": "Easy",
                "sampleAnswer": "Highlighted resonance with purpose-driven technology transformation, fostering inclusive innovation, and solving complex client problems."
        }
],
      "system-design": [
        {
                "question": "Design a Compliance Monitoring system tracking regulatory policy changes across 50+ international jurisdictions.",
                "difficulty": "Hard",
                "sampleAnswer": "NLP scraper pipeline processing regulatory publications, LLM classification mapping changes to policy knowledge graphs with automated compliance alerts."
        },
        {
                "question": "Design a Global Supply Chain Carbon Accounting Platform calculating Scope 1, 2, and 3 emissions.",
                "difficulty": "Hard",
                "sampleAnswer": "Data integration connectors pulling ERP/fuel/logistics metrics, GHG protocol calculation engine, audit-ready data lineage ledger."
        },
        {
                "question": "Design a Tax Technology Platform performing real-time cross-border VAT/GST calculations for e-commerce transactions.",
                "difficulty": "Hard",
                "sampleAnswer": "Low-latency rules engine with geo-IP and address validation, caching regional tax rate tables in memory for sub-50ms API response."
        },
        {
                "question": "Design an Enterprise Knowledge Management Search Engine indexing millions of internal consulting slide decks and reports.",
                "difficulty": "Hard",
                "sampleAnswer": "Document extraction pipeline (OCR/PDF parsing), vector embeddings generated via LLM, stored in Vector Search Index with RBAC document security filters."
        },
        {
                "question": "Design a Digital Twin platform for a manufacturing client monitoring factory IoT sensor telemetry.",
                "difficulty": "Hard",
                "sampleAnswer": "IoT Edge gateways streaming MQTT metrics to Azure IoT Hub, time-series database storage, 3D visualization engine rendering real-time equipment status."
        },
        {
                "question": "Design a Customer Loyalty and Rewards Platform for a global retail client handling millions of daily transactions.",
                "difficulty": "Hard",
                "sampleAnswer": "Event-driven architecture processing purchase events, rules engine evaluating point accruals, Redis cache for instant balance retrieval."
        }
]
    }
  },
  "KPMG": {
    logo: "/logos/kpmg.png",
    color: "#00338D",
    questions: {
      technical: [
        {
                "question": "A client wants to implement Data Mesh architecture. Explain its 4 core principles vs Centralized Data Warehouse.",
                "difficulty": "Hard",
                "sampleAnswer": "1. Domain-oriented ownership. 2. Data as a product. 3. Self-serve data platform. 4. Federated computational governance. Decouples central bottleneck."
        },
        {
                "question": "Explain Infrastructure as Code (IaC) principles using Terraform / Bicep.",
                "difficulty": "Medium",
                "sampleAnswer": "Declarative infrastructure definition stored in version control, enabling repeatable automated deployments, state management, and drift detection."
        },
        {
                "question": "How do you design a High-Availability Multi-Region Kubernetes (AKS/EKS) cluster architecture?",
                "difficulty": "Hard",
                "sampleAnswer": "Deploy independent clusters per region, manage configurations via GitOps (ArgoCD), route global traffic using Azure Traffic Manager / AWS Route53."
        },
        {
                "question": "Explain OAuth 2.0 Authorization Framework flows: Authorization Code with PKCE vs Client Credentials.",
                "difficulty": "Medium",
                "sampleAnswer": "Auth Code + PKCE for single-page/mobile apps preventing code interception. Client Credentials for machine-to-machine service communication."
        },
        {
                "question": "How do you approach Database Performance Tuning for slow analytical SQL queries?",
                "difficulty": "Medium",
                "sampleAnswer": "Analyze EXPLAIN execution plan, add missing indexes, rewrite non-sargable queries, optimize joins, and consider table partitioning."
        },
        {
                "question": "Explain Service Mesh architecture (Istio/Linkerd): Sidecar proxies, Mutual TLS (mTLS), and Traffic Split.",
                "difficulty": "Hard",
                "sampleAnswer": "Inject sidecar proxies (Envoy) next to application containers to handle mTLS encryption, service discovery, traffic splitting, and tracing transparently."
        }
],
      behavioral: [
        {
                "question": "Tell me about a time you simplified a complex technical concept for non-technical client stakeholders.",
                "difficulty": "Medium",
                "sampleAnswer": "Used relatable business analogies, focused on strategic value metrics rather than code details, ensuring clear stakeholder buy-in."
        },
        {
                "question": "How do you stay current with rapidly evolving technology trends and cloud advancements?",
                "difficulty": "Easy",
                "sampleAnswer": "Dedicated weekly time for official cloud documentation, pursuing certifications, building prototype side projects, and reading technology blogs."
        },
        {
                "question": "Tell me about a time you led a project team through unexpected scope changes.",
                "difficulty": "Medium",
                "sampleAnswer": "Re-assessed project timeline, communicated revised deliverables clearly with client, and reorganized team sprint priorities."
        },
        {
                "question": "Describe a situation where you had to resolve a deadlock between engineering and business teams.",
                "difficulty": "Medium",
                "sampleAnswer": "Facilitated alignment session focused on customer outcomes, established objective evaluation criteria, and agreed on phased delivery."
        },
        {
                "question": "Tell me about a time you took initiative to automate a manual team process.",
                "difficulty": "Medium",
                "sampleAnswer": "Identified repetitive deployment steps, wrote automated CI/CD scripts, saving team 4 hours per release cycle."
        },
        {
                "question": "Why KPMG Lighthouse and Digital Lighthouse technology consulting?",
                "difficulty": "Easy",
                "sampleAnswer": "Expressed enthusiasm for KPMG's data-driven innovation culture, AI & Cloud capabilities, and multidisciplinary advisory excellence."
        }
],
      "system-design": [
        {
                "question": "Design an ESG (Environmental, Social, Governance) Reporting Platform for global enterprise clients.",
                "difficulty": "Hard",
                "sampleAnswer": "Hierarchical data collection engine aggregating facility emission data, applying GHG emission factors, generating compliance reports."
        },
        {
                "question": "Design a Global IT Asset Management (ITAM) and Software License Compliance platform.",
                "difficulty": "Hard",
                "sampleAnswer": "Lightweight agent software scanning enterprise network devices, central discovery server parsing installed software against licensing contract database."
        },
        {
                "question": "Design an Enterprise Continuous Vulnerability Management and Remediation Tracking platform.",
                "difficulty": "Hard",
                "sampleAnswer": "Integrate vulnerability scanners (Qualys/Tenable), ingest CVE alerts, correlate against asset inventory, auto-assign remediation tickets to team leads."
        },
        {
                "question": "Design a Real-Time Algorithmic Trading Compliance Audit logging system.",
                "difficulty": "Hard",
                "sampleAnswer": "Ultra-low-latency append-only ring buffer log collector, writing trade execution events to WORM (Write Once Read Many) compliant storage."
        },
        {
                "question": "Design a Multi-Cloud FinOps Spend Optimization and Anomaly Detection engine.",
                "difficulty": "Hard",
                "sampleAnswer": "Ingest daily cost billing files from AWS/Azure/GCP, run anomaly detection ML algorithms to flag unexpected spend spikes, providing right-sizing recommendations."
        },
        {
                "question": "Design a Global Enterprise Contract Analysis and Extraction Engine using Generative AI.",
                "difficulty": "Hard",
                "sampleAnswer": "OCR contract ingestion, chunking text into vector store, RAG pipeline answering legal query prompts with document source citations."
        }
]
    }
  },
  "McKinsey": {
    logo: "/logos/mckinsey.svg",
    color: "#004B87",
    questions: {
      technical: [
        {
                "question": "Your client is a national grocery chain seeing declining profit margins despite growing revenue. Structure your approach.",
                "difficulty": "Hard",
                "sampleAnswer": "Decompose Profit into Revenue (Volume x Price) and Costs (COGS + Opex). Segment by store, product category, and channel to isolate margin compression."
        },
        {
                "question": "How do you evaluate whether a traditional manufacturing client should build, buy, or partner for a Digital IoT platform?",
                "difficulty": "Hard",
                "sampleAnswer": "Assess Core Competency vs Time-to-Market vs Strategic Control vs TCO. Build if core differentiator, Buy if standardized, Partner if ecosystem play."
        },
        {
                "question": "Explain the methodology for sizing a new market (TAM, SAM, SOM) for a client launching a novel SaaS product.",
                "difficulty": "Medium",
                "sampleAnswer": "Top-down (industry report data filtered by target demographics) vs Bottom-up (number of potential accounts x average deal size). Validate both."
        },
        {
                "question": "How do you assess IT Operating Model efficiency and Cloud Migration ROI for a Fortune 500 client?",
                "difficulty": "Hard",
                "sampleAnswer": "Evaluate run-rate infrastructure costs, developer productivity gains, time-to-market acceleration, and risk reduction against migration capital expenditure."
        },
        {
                "question": "Explain Data Strategy and Analytics Maturity Framework for enterprise client transformations.",
                "difficulty": "Medium",
                "sampleAnswer": "Stages: Descriptive (What happened?) -> Diagnostic (Why?) -> Predictive (What will happen?) -> Prescriptive (What should we do?)."
        },
        {
                "question": "How do you design a Technology Due Diligence framework for a Private Equity client acquiring a software company?",
                "difficulty": "Hard",
                "sampleAnswer": "Evaluate Architecture Scalability, Tech Debt, Security/Compliance risks, Developer Velocity, Proprietary IP defensibility, and R&D organization capability."
        }
],
      behavioral: [
        {
                "question": "Tell me about your most significant leadership experience. What was the measurable impact?",
                "difficulty": "Medium",
                "sampleAnswer": "Described driving strategic initiative, overcoming major obstacles, motivating cross-functional team, delivering quantifiable business outcome."
        },
        {
                "question": "Describe a time you had to influence senior stakeholders without having formal authority.",
                "difficulty": "Hard",
                "sampleAnswer": "Built consensus using data-driven insights, addressed individual stakeholder priorities, and demonstrated quick-win prototype value."
        },
        {
                "question": "Tell me about a time you solved a complex ambiguous problem with limited data available.",
                "difficulty": "Hard",
                "sampleAnswer": "Formulated clear hypotheses, conducted expert interviews and proxy benchmarks, synthesized actionable strategic recommendations."
        },
        {
                "question": "Describe a situation where you had to manage a high-stakes project under extreme pressure.",
                "difficulty": "Medium",
                "sampleAnswer": "Prioritized critical path activities, maintained transparent communication, remained calm under pressure, achieving target objective."
        },
        {
                "question": "Tell me about a time you failed to convince a team member of your proposed direction. How did you react?",
                "difficulty": "Medium",
                "sampleAnswer": "Listened empathetically to feedback, re-evaluated trade-offs, incorporated valid counter-points into refined collaborative solution."
        },
        {
                "question": "Why McKinsey & Company? How do you embody McKinsey's commitment to client impact and dual mission?",
                "difficulty": "Easy",
                "sampleAnswer": "Expressed passion for solving top-management strategic challenges, personal commitment to excellence, continuous growth, and global client impact."
        }
],
      "system-design": [
        {
                "question": "Design the Commercial Due Diligence workplan for a PE firm evaluating a $500M B2B SaaS acquisition.",
                "difficulty": "Hard",
                "sampleAnswer": "Analyze Market Attractiveness, Customer Churn/NDR cohorts, Competitive Differentiation, Sales Efficiency (CAC Payback), Product Roadmap."
        },
        {
                "question": "Design an Enterprise Digital Transformation Roadmap for a global logistics client.",
                "difficulty": "Hard",
                "sampleAnswer": "Phase 1: Core modernization & data foundation. Phase 2: Operational automation & predictive analytics. Phase 3: Ecosystem platform integration."
        },
        {
                "question": "Design a Global Supply Chain Resilience Model for an automotive OEM mitigating geopolitical disruptions.",
                "difficulty": "Hard",
                "sampleAnswer": "Multi-tier supplier mapping graph database, real-time disruption monitoring alerts, inventory buffer optimization model."
        },
        {
                "question": "Design an Omnichannel Retail Strategy and Customer Data Platform (CDP) for a luxury brand.",
                "difficulty": "Hard",
                "sampleAnswer": "Unified customer profile database connecting online store and physical boutique POS terminals, personalized recommendation engine."
        },
        {
                "question": "Design a Banking Modernization Strategy transitioning legacy core banking to microservices cloud architecture.",
                "difficulty": "Hard",
                "sampleAnswer": "Domain-Driven Design bounded contexts, Strangler Fig pattern for incremental migration, dual-write ledger synchronization."
        },
        {
                "question": "Design a Healthcare Payer Value-Based Care Data Platform optimizing patient health outcomes.",
                "difficulty": "Hard",
                "sampleAnswer": "Ingest clinical EHR and claims data, calculate risk stratification scores, deliver actionable patient care insights to provider dashboards."
        }
]
    }
  },
  "BCG": {
    logo: "/logos/bcg.png",
    color: "#00875A",
    questions: {
      technical: [
        {
                "question": "An automotive client wants to launch an EV line. How do you assess whether this is the right strategic move?",
                "difficulty": "Hard",
                "sampleAnswer": "Evaluate Market Opportunity, Regulatory Mandates, Battery Supply Chain & Technology readiness, Financial TCO, and Competitive Positioning."
        },
        {
                "question": "Explain the Growth-Share Matrix (BCG Matrix): Stars, Cash Cows, Question Marks, Dogs.",
                "difficulty": "Medium",
                "sampleAnswer": "Framework categorizing business units by Market Growth Rate and Relative Market Share to guide strategic capital allocation."
        },
        {
                "question": "How do you design a Dynamic Pricing Optimization Strategy for a hotel chain with 200 properties?",
                "difficulty": "Hard",
                "sampleAnswer": "Demand forecasting ML models incorporating seasonality/events, price elasticity estimation, dynamic rate updates via automated yield management."
        },
        {
                "question": "Explain Digital Transformation Capability Building: Lighthouse concept and scaling across units.",
                "difficulty": "Medium",
                "sampleAnswer": "Build high-impact digital pilot (Lighthouse) in one factory/unit, prove value, codify playbook, and scale across global operating units."
        },
        {
                "question": "How do you conduct Net Zero decarbonization assessment for an industrial client?",
                "difficulty": "Hard",
                "sampleAnswer": "Map carbon footprint baseline (Scope 1, 2, 3), prioritize abatement levers by marginal abatement cost curve (MACC), define target roadmap."
        },
        {
                "question": "Explain AI Value Realization framework: How to transition from proof-of-concept AI models to enterprise scale.",
                "difficulty": "Hard",
                "sampleAnswer": "Address 10/20/70 rule: 10% algorithm, 20% technology/data infrastructure, 70% business process & change management transformation."
        }
],
      behavioral: [
        {
                "question": "Tell me about a time you changed your mind on something important based on new data.",
                "difficulty": "Medium",
                "sampleAnswer": "Held initial hypothesis, analyzed incoming empirical data disproving belief, embraced new evidence, and adjusted strategic recommendation."
        },
        {
                "question": "Why BCG (Boston Consulting Group)? How do you align with BCG's unlocking human potential philosophy?",
                "difficulty": "Easy",
                "sampleAnswer": "Highlighted affinity for BCG's innovative culture, BCG X tech capabilities, collaborative team environment, and customized client solutions."
        },
        {
                "question": "Tell me about a time you had to deal with ambiguity on a project.",
                "difficulty": "Medium",
                "sampleAnswer": "Broke problem down into structured sub-questions, established testable hypotheses, gathered target data, and brought clarity."
        },
        {
                "question": "Describe a project where you led a team through a significant creative breakthrough.",
                "difficulty": "Medium",
                "sampleAnswer": "Fostered open brainstorming environment, challenged underlying assumptions, synthesized diverse perspectives into innovative solution."
        },
        {
                "question": "Tell me about a time you managed a difficult working relationship with a team member.",
                "difficulty": "Medium",
                "sampleAnswer": "Initiated open 1-on-1 dialogue, identified shared objectives, agreed on clear roles and communication channels, building strong partnership."
        },
        {
                "question": "Describe a situation where you had to persuade a client to adopt a bold transformation strategy.",
                "difficulty": "Hard",
                "sampleAnswer": "Presented compelling data-driven case, illustrated market disruption risk of inaction, demonstrated proof-of-concept quick win."
        }
],
      "system-design": [
        {
                "question": "Design a Dynamic Pricing Engine for a global airline optimizing seat revenues.",
                "difficulty": "Hard",
                "sampleAnswer": "Real-time demand forecasting using time-series models, inventory allocation across fare buckets, competitor price scraping pipeline."
        },
        {
                "question": "Design a BCG X AI-powered Personalization Engine for an E-commerce retail client.",
                "difficulty": "Hard",
                "sampleAnswer": "Real-time user event ingestion, multi-armed bandit recommendation algorithms, vector similarity search for product catalogs."
        },
        {
                "question": "Design a Smart Grid Energy Optimization Platform for a utility client managing renewable energy.",
                "difficulty": "Hard",
                "sampleAnswer": "IoT telemetry ingesting solar/wind generation data, battery storage optimization algorithm, dynamic grid load balancing."
        },
        {
                "question": "Design a Global Supply Chain Control Tower Platform providing real-time visibility.",
                "difficulty": "Hard",
                "sampleAnswer": "Integrate ERP/carrier API streams, event-driven anomaly detection identifying shipment delays, predictive ETAs using ML."
        },
        {
                "question": "Design a Telecommunications 5G Network Expansion Planning Tool.",
                "difficulty": "Hard",
                "sampleAnswer": "Geospatial GIS data processing, population density & revenue potential estimation, optimal cell tower placement algorithm."
        },
        {
                "question": "Design an Automated Enterprise Customer Churn Prediction and Retention System.",
                "difficulty": "Hard",
                "sampleAnswer": "Feature store aggregating telemetry/support/billing metrics, XGBoost churn scoring pipeline, automated retention workflow triggers."
        }
]
    }
  },
  "Bain & Company": {
    logo: "/logos/bain.png",
    color: "#CC0000",
    questions: {
      technical: [
        {
                "question": "A consumer goods client is considering acquiring a Direct-to-Consumer (DTC) brand. Walk through your analysis.",
                "difficulty": "Hard",
                "sampleAnswer": "Assess Strategic Fit, DTC Target Unit Economics (CAC, LTV, Repeat Rate), Synergies (Revenue & Cost), and Integration risks."
        },
        {
                "question": "Explain Net Promoter Score (NPS) methodology developed by Bain and how to drive Customer Loyalty.",
                "difficulty": "Medium",
                "sampleAnswer": "Categorize customers into Promoters (9-10), Passives (7-8), Detractors (0-6). NPS = %Promoters - %Detractors. Drive closed-loop feedback."
        },
        {
                "question": "How do you evaluate Private Equity Due Diligence value creation levers (Revenue growth, Margin expansion, Multiple expansion)?",
                "difficulty": "Hard",
                "sampleAnswer": "Identify commercial quick wins, operational cost reductions, pricing optimization, bolt-on M&A opportunities, and exit positioning."
        },
        {
                "question": "Explain Results Delivery (Change Management) framework to ensure client strategy execution.",
                "difficulty": "Medium",
                "sampleAnswer": "Address Sponsor commitment, Team capability, Executive alignment, and Metric tracking to overcome implementation risk."
        },
        {
                "question": "How do you design a Zero-Based Redesign (ZBR) cost reduction program for a client?",
                "difficulty": "Hard",
                "sampleAnswer": "Rebuild budget from zero based on essential business activities rather than historical spend, eliminating legacy inefficiencies."
        },
        {
                "question": "Explain Commercial Strategy: Customer Segmentation and Micro-segmentation analytics.",
                "difficulty": "Medium",
                "sampleAnswer": "Cluster customer base by behavioral telemetry, profitability, and needs to deliver targeted product offerings and pricing."
        }
],
      behavioral: [
        {
                "question": "Tell me about a result you achieved that you are most proud of. Why was it meaningful?",
                "difficulty": "Medium",
                "sampleAnswer": "Described ambitious project, personal drive and team leadership, quantifiable business impact, and personal growth achieved."
        },
        {
                "question": "Tell me about a time a team you were on was underperforming. How did you help turn things around?",
                "difficulty": "Medium",
                "sampleAnswer": "Diagnosed root causes of friction, clarified role responsibilities, established open communication, restoring high performance."
        },
        {
                "question": "Why Bain & Company? How do you connect with Bain's 'True North' core values?",
                "difficulty": "Easy",
                "sampleAnswer": "Emphasized passion for Bain's results-driven ethos, supportive 'Bainie' culture, focus on client outcomes, and collaborative team environment."
        },
        {
                "question": "Tell me about a time you had to make a tough trade-off decision under tight deadlines.",
                "difficulty": "Medium",
                "sampleAnswer": "Evaluated core priorities, sacrificed secondary features to guarantee baseline quality, delivered on time."
        },
        {
                "question": "Describe a situation where you led a team through a significant pivot in project strategy.",
                "difficulty": "Medium",
                "sampleAnswer": "Communicated rationale for pivot clearly, re-aligned workstream goals, maintained high team morale and momentum."
        },
        {
                "question": "Tell me about a time you went above and beyond to support a team member in need.",
                "difficulty": "Medium",
                "sampleAnswer": "Noticed teammate struggling with workload, stepped in to share tasks, provided coaching, ensuring project success."
        }
],
      "system-design": [
        {
                "question": "Design a PE Portfolio Customer Success Program reducing annual logo churn from 15% to 8%.",
                "difficulty": "Hard",
                "sampleAnswer": "Build predictive customer health score model, establish tiered CSM coverage, create automated onboarding workflows and intervention playbooks."
        },
        {
                "question": "Design a Bain Results Delivery Tracking Dashboard monitoring 500+ transformation initiatives across an enterprise.",
                "difficulty": "Hard",
                "sampleAnswer": "Centralized data model tracking milestone status, financial value realization, risk flags, with executive drill-down views."
        },
        {
                "question": "Design an Automated Commercial Due Diligence Data Analytics Platform for PE investors.",
                "difficulty": "Hard",
                "sampleAnswer": "Ingest target company data room metrics (billing, web traffic, customer transactions), run automated cohort churn & LTV/CAC analytics."
        },
        {
                "question": "Design a Direct-to-Consumer (DTC) E-Commerce Platform architecture built for rapid scaling.",
                "difficulty": "Hard",
                "sampleAnswer": "Headless commerce architecture (Next.js frontend + Shopify/Stripe API backend), global CDN caching, microservices fulfillment engine."
        },
        {
                "question": "Design a Global Procurement Spend Analytics Platform for cost reduction programs.",
                "difficulty": "Hard",
                "sampleAnswer": "Ingest purchase order/invoice data across ERPs, run entity resolution & spend classification ML models, highlight savings opportunities."
        },
        {
                "question": "Design a Customer NPS Survey Feedback Loop and Sentiment Analysis Platform.",
                "difficulty": "Hard",
                "sampleAnswer": "Trigger post-interaction NPS surveys, run NLP sentiment analysis on text comments, automatically route detractors to resolution teams."
        }
]
    }
  },
  "Accenture": {
    logo: "/logos/accenture.png",
    color: "#A100FF",
    questions: {
      technical: [
        {
                "question": "A client wants to modernize a legacy monolithic Java application into microservices using Strangler Fig pattern. How do you execute?",
                "difficulty": "Hard",
                "sampleAnswer": "Identify bounded contexts via DDD, extract least-coupled high-value module into standalone microservice with dedicated DB, route via API Gateway."
        },
        {
                "question": "Explain CI/CD Pipeline automation for an enterprise with 50+ development teams.",
                "difficulty": "Medium",
                "sampleAnswer": "Standardize pipeline templates (YAML), establish quality gates (code coverage, zero critical security flaws), containerize builds, use trunk-based development."
        },
        {
                "question": "Explain Multi-Cloud Architecture strategy: AWS vs Azure vs GCP workload placement.",
                "difficulty": "Medium",
                "sampleAnswer": "Match workloads to provider strengths (AWS for general cloud, Azure for enterprise Microsoft ecosystem, GCP for AI/Data Analytics), manage via Terraform."
        },
        {
                "question": "How do you implement Microservices Event-Driven Messaging using Kafka / RabbitMQ?",
                "difficulty": "Hard",
                "sampleAnswer": "Publish domain events to Kafka topics, use consumer groups for parallel processing, implement idempotent event handlers and dead-letter queues."
        },
        {
                "question": "Explain Serverless Architecture (AWS Lambda / Azure Functions) advantages and cold-start mitigations.",
                "difficulty": "Medium",
                "sampleAnswer": "Event-driven auto-scaling with pay-per-use billing. Mitigate cold starts using provisioned concurrency, lightweight runtimes, and bundle size reduction."
        },
        {
                "question": "How do you design an API Management (APIM) strategy for external and internal enterprise APIs?",
                "difficulty": "Medium",
                "sampleAnswer": "Enforce API Gateway policies for Rate Limiting, Authentication (OAuth2/JWT), Request/Response transformation, Developer Portal documentation."
        }
],
      behavioral: [
        {
                "question": "Tell me about a time you had to adapt quickly to a major change in client requirements.",
                "difficulty": "Medium",
                "sampleAnswer": "Evaluated impact on timeline and resources, re-prioritized sprint backlog, communicated transparently with client, delivered adapted solution."
        },
        {
                "question": "Accenture operates at massive scale. Describe a project where you coordinated cross-functional teams across regions.",
                "difficulty": "Medium",
                "sampleAnswer": "Established clear governance framework, held regular inter-team syncs, tracked dependencies via RAID log, ensuring smooth delivery."
        },
        {
                "question": "Tell me about a time you resolved a major technical blocker during a critical deployment.",
                "difficulty": "Medium",
                "sampleAnswer": "Triaged issue systematically, collaborated with specialized SMEs, identified root cause fix, successfully completed deployment window."
        },
        {
                "question": "Describe a project where you introduced an innovative technology solution to solve a client problem.",
                "difficulty": "Medium",
                "sampleAnswer": "Researched emerging technology, built working proof-of-concept, demonstrated tangible ROI, successfully led client adoption."
        },
        {
                "question": "Tell me about a time you mentored junior developers on your delivery team.",
                "difficulty": "Medium",
                "sampleAnswer": "Conducted code reviews, paired on complex tasks, provided ongoing feedback, helping them grow into confident independent contributors."
        },
        {
                "question": "Why Accenture? How do you connect with Accenture's 'Let There Be Change' brand promise?",
                "difficulty": "Easy",
                "sampleAnswer": "Expressed passion for technology transformation at scale, continuous learning ecosystem, global collaborative culture, and driving positive client change."
        }
],
      "system-design": [
        {
                "question": "Design a Cloud Migration Strategy for moving 200+ enterprise applications to AWS/Azure.",
                "difficulty": "Hard",
                "sampleAnswer": "Classify apps via 6 R's framework, establish Cloud Center of Excellence (CCoE), build automated landing zones, migrate in prioritized waves."
        },
        {
                "question": "Design an Enterprise GenAI Knowledge Platform for a 500k employee organization.",
                "difficulty": "Hard",
                "sampleAnswer": "RAG architecture with vector database indexing internal enterprise documents, fine-tuned LLM, role-based document security filters."
        },
        {
                "question": "Design an Intelligent Automation Platform combining RPA, OCR, and AI decision engines.",
                "difficulty": "Hard",
                "sampleAnswer": "Document ingestion API -> OCR/AI text extraction -> Rules Engine -> RPA bot execution -> Exception management dashboard."
        },
        {
                "question": "Design a Smart Factory IoT Analytics Platform for an industrial manufacturing client.",
                "difficulty": "Hard",
                "sampleAnswer": "Edge sensors streaming telemetry via MQTT to Cloud Event Hub, time-series DB, predictive maintenance ML models alerting operators."
        },
        {
                "question": "Design a Multi-Tenant Cloud ERP System for global enterprise operations.",
                "difficulty": "Hard",
                "sampleAnswer": "Modular microservices architecture, tenant-isolated data partitions, global event-driven messaging, real-time financial reporting."
        },
        {
                "question": "Design an Enterprise Continuous Integration and Deployment (CI/CD) Platform at scale.",
                "difficulty": "Hard",
                "sampleAnswer": "Centralized pipeline template repository, containerized build agents, automated security scanning gates, multi-environment deployment orchestration."
        }
]
    }
  }
};
