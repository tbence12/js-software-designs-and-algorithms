class Job {
  name: string;
  priority: number;

  constructor(name: string, priority: number) {
    this.name = name;
    this.priority = priority;
  }
}

class PriorityQueue {
  private queue: Job[];

  constructor() {
    this.queue = [];
  }

  enqueue(job: Job): void {
    if (this.isEmpty()) {
      this.queue.push(job);
    } else {
      let added = false;
      for (let i = 0; i < this.queue.length; i++) {
        if (job.priority < this.queue[i].priority) {
          this.queue.splice(i, 0, job);
          added = true;
          break;
        }
      }
      if (!added) {
        this.queue.push(job);
      }
    }
  }

  dequeue(): Job | undefined {
    return this.queue.shift();
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}

class JobRunner {
  private queue: PriorityQueue;

  constructor() {
    this.queue = new PriorityQueue();
  }

  addJob(job: Job): void {
    this.queue.enqueue(job);
  }

  runJobs(): void {
    while (!this.queue.isEmpty()) {
      const job = this.queue.dequeue();
      console.log(`Running job "${job?.name}"...`);
    }
  }
}

const numberOfJobs = 10001;
const jobRunner = new JobRunner();

for(let i = 0; i < numberOfJobs; i++) {
  const priority = Math.floor(Math.random() * numberOfJobs);
  console.log(`Job ${i} priority: ${priority}`);
  jobRunner.addJob(new Job(`Job ${i}`, priority));
}

jobRunner.runJobs();
