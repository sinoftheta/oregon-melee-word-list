const fs = require('fs');

if(process.argv.length == 2) console.log("no input file supplied!")

try {
  let list = fs.readFileSync(process.argv[2], 'utf8')

  list = list.replace( /[\r\n]+/gm, "" ) // remove all newlines

  let terms = list.split(',')

  terms = terms.map(term => term.trim()).filter(term => term != '')
  
  console.log("there are ", terms.length, " terms")

  // check for duplicates
  terms.sort()
  terms.forEach((term,i) => {
    if (i == 0) return
    if(term == terms[i - 1]) console.log(term, " has a duplicate")
  })

  // convert to letter/space hashes
  const hashes = terms.map(term => {
      let hash = ""
      term.split(" ")
      .map(word => word.length)
      .forEach(length => hash += length + "_")
      return hash
    }
  )
  hashes.sort()
  //console.log(hashes)

  let hash_amounts = {}

  hashes.forEach( (hash, i) => {
    if (hash != hashes[i - 1] || i == 0) {
        hash_amounts[hash] = 1
    }
    else {
        hash_amounts[hash] += 1
    }
  })

  console.log(hash_amounts)
  


} catch (err) {
  console.error(err)
}