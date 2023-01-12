class Sequence {
  start = null;
  end = null;
  
  constructor(start, end) {
      this.start = start;
      this.end = end;
  };
  
  contains(n) {
      return n >= this.start && n <= this.end;
  };
  
  justBeforeStart(n) {
      return n === this.start - 1;
  };
  
  justAfterEnd(n) {
      return n === this.end + 1
  };
  
  getLength() {
      return this.end - this.start + 1;
  };
}

class DenseArray {
  values = [];
  
  add(n) {
    for(let i = 0; i < this.values.length; i++) {
        const currSeq = this.values[i];
        if (currSeq.contains(n)) return;
        
        if (currSeq.justBeforeStart(n)) {
            currSeq.start = n;
            return;
        }
        
        if (currSeq.justAfterEnd(n)) {
            currSeq.end = n;
            return ;
        }
    }
    
    this.values.push(new Sequence(n, n));
  }

  sanitize() {
    this.values.sort((a, b) => a.start - b.start);

      for(let i = 1; i < this.values.length; i++) {
        
        const left = this.values[i-1];
        const right = this.values[i];

        if(left.end === right.start || left.end + 1 === right.start) {
          left.end = right.end;
          this.values.splice(i, 1);
          i--;
        }
      }
  }

  insert(n) {
      this.add(n);
      this.sanitize();
  };
  
  getMaxSeqLength() {
      let maxSeqLength = 0;
      for (let i = 0; i < this.values.length; i++) {
          const currSeq = this.values[i];
          if (currSeq.getLength() > maxSeqLength) maxSeqLength = currSeq.getLength();
      }
      
      return maxSeqLength;
  };
  
  getMaxAckowledgedNumber() {
      let maxAckowledgedNumber = Number.MIN_SAFE_INTEGER;
      
      for (let i = 0; i < this.values.length; i++) {
          const currSeq = this.values[i];
          if (currSeq.end > maxAckowledgedNumber) maxAckowledgedNumber = currSeq.end;
      }
      
      return maxAckowledgedNumber;
  }

  getMinUnackowledgedNumber() {
      let minUnackowledgedNumber = 0;
      
      for (let i = 0; i < this.values.length; i++) {
          const currSeq = this.values[i];
          if (currSeq.contains(minUnackowledgedNumber)) return currSeq.end + 1;
      }
      
      return minUnackowledgedNumber;
  }
  
  isAckowledged(n) {
      for(let i = 0; i < this.values.length; i++) {
          const currSeq = this.values[i];
          if (currSeq.contains(n)) return true;
      }
      return false;
  }

  getTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.values.length; i++) {
          const currSeq = this.values[i];
          totalLength += currSeq.getLength();
      }
      
      return totalLength;
  }

  print() {
      console.log(this.values);
  }
}

class AcknowledgeCalculator
{
  constructor() {
    this.denseArray = new DenseArray();
  }

  ack(i) {
    this.denseArray.insert(i);
  }

  lowestUnack() {
    return this.denseArray.getMinUnackowledgedNumber();
  }

  highestAck() {
    return this.denseArray.getMaxAckowledgedNumber();
  }

  async startTest() {
    const test = new AcknowledgeCalculator();
    let interactions = 0;
    while(test.lowestUnack() !== 100) {
      const n = Math.floor((Math.random() * 100));
      test.ack(n);
      console.log(`${interactions++} ack(${n})`);
      console.log(`lowestUnack: ${test.lowestUnack()}`);
      console.log(`highestAck: ${test.highestAck()}`);
      console.log(`totalLength: ${test.denseArray.getTotalLength()}`);
      console.log(`maxSeqLength: ${test.denseArray.getMaxSeqLength()}`);
      test.denseArray.print();
      console.log(`------------------------------------\n`);
      await new Promise(r => setTimeout(r, 100));
    }
  }

}


const ac = new AcknowledgeCalculator();
ac.startTest();