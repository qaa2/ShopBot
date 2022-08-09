import JSONdb from 'simple-json-db'

const db = new JSONdb('storage.json')

import { signIn, appendEventListener } from "photopjs"

const session = signIn("ShopBot", process.env.PASS).then(async session => {
  console.log('Never gonna give you up')
  console.log('Never gonna let you down')
  console.log('Never gonna run around and desert you')
  console.log('Never gonna make you cry')
  console.log('Never gonna say goodbye')
  console.log('Never gonna tell a lie and hurt you')
})

/*
arrays, texts, and functions
data
working
laboring
adErr
getRandomInt
*/

const data = { //Default Data
  money: 0,
  items: 1,
  shoppers: 1,
  spot: "Thrift Shop",
  prestige: 0,
  workers: 0,
  rank: "User"
  /*
  hmm
  coming in a later update
  */
}

const adErr = 'You do not have enough money to purchase this product.'

const working = []

const laboring = []

function getRandomInt(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

appendEventListener("newPost", async function(post) {
  let p = await post.getData()
  let author; try { author = await post.getAuthor() } catch (err) { return; }
  if (p.text == "?start") {
    if (db.get(author.id) == undefined) {
      post.sendChat(`Hey @${author.username} ! Your data has been created.`)
      db.set(author.id, JSON.stringify(data))
    }
    const d = JSON.parse(db.get(author.id))
    if (d.nickname == undefined && d.money != undefined) {
      post.sendChat(`Hey @${author.username} ! Welcome back to ShopBot!`)
    }
    if (d.nickname == undefined)
      if (d.nickname != undefined) {
        post.sendChat(`Hey ${d.nickname}! Welcome back to ShopBot!`)
      }
    post.onChat(function(chat) {
      const c = chat.text.trim().split(" ")
        ;

      /*
      help command(s)
      */
      switch (c[0]) {

        case '?help':
          switch (c[1]) {
            case '1':
              chat.reply("(!Basic Command List) || ?work, ?stats, ?prestige, ?hire {(`amount)}, ?move {(`spot)}")
              break;
            case '2':
              chat.reply("(!Extra Command List) || ?bug")
              break;
            case '3':
              chat.reply("(!Other Help Command List) || ?help prestige, ?help hire, ?help move, ?help shoppers")
              break;
            case 'prestige':
              chat.reply("(!Prestige) || Prestiging multiplies/increases your earnings but resets your current data.")
              break;
            case 'shoppers':
              chat.reply("(!Shoppers) || Shoppers are the people who buy your items. The more shoppers you have, the more money you earn.")
              break;
            case 'ad':
              switch (c[2]) {
                case 'lamppost':
                  chat.reply("(!Lamppost) || Put a poster on a lamppost or something. || Max earn: 5 || Cost: 15")
                  break;
                case 'twitter':
                  chat.reply("(!Twitter) || The bird in the logo will deliver your fliers. || Max earn: 7 || Cost: 25")
                  break;
                default:
                  chat.reply("(!Ads by ID) || lamppost || twitter || google || tv || spotify")
                  break;
              }
            case 'spots':
              switch (c[2]) {
                case 'picturestore':
                  chat.reply("(!Picture Store) This is a store where you sell pictures you took. Price: $100,000")
                  break;
                case 'liquorstore':
                  chat.reply("(!Liquor Store) Just sell liquor to random people coming home from work. Price: $250,000")
                  break;
                default:
                  chat.reply("(!Spots by ID) || picturestore || liquorstore")
                  break;
              }
            case 'work':
              chat.reply("(!Work Command) || You work and gain a certain amount of money. Math: Items * Shoppers / 2")
              break;

            default:
              chat.reply("(!ShopBot Command List) || 1: Basic Commands || 2: Extra Commands || 3. Other Help Commands")
              break;
          }
          break;

        /*
        stats command
        */

        case '?stats':
          chat.reply(`Stats for ${d.nickname}, @${author.username} || Money: ${d.money} || Shoppers: ${d.shoppers} || Items: ${d.items} || Workers: ${d.workers} || Spot: ${d.spot} || Prestige: ${d.prestige}`)
          break;

        /*
        work command
        */

        case '?work':
          if (working.includes(author.id)) {
            chat.reply(`Your items are restocking. "Patience you must have, my young padawan." - Yoda(?)`)
            return;
          }
          const gain = d.items * d.shoppers / 2
          chat.reply(`You sold 1 item and gained $${gain}. Wait 24 seconds until your item restocks.`)
          working.push(author.id)
          d.money += gain
          db.set(author.id, JSON.stringify(d))
          setTimeout(function() {
            chat.reply(`Your items have been restocked. You may now work at your shop again.`)
            working.splice(working.indexOf(author.id), 1)
          }, 24000)
          break;

        /*
        advertisements
        */

        case '?ad':
          switch (c[1]) {
            case 'lamppost':
              if (d.money >= 15) {
                var adearn = getRandomInt(1, 5)
                chat.reply(`You advertised at a lamppost and earned ${adearn} shoppers.`)
                d.shoppers += adearn
                d.money -= 15
                db.set(author.id, JSON.stringify(d))
              }
              if (d.money < 16) {
                chat.reply(adErr)
              }
              break;
            case 'twitter':
              if (d.money >= 25) {
                var adearn = getRandomInt(1, 7)
                chat.reply(`You advertised on twitter and earned ${adearn} shoppers.`)
                d.shoppers += adearn
                d.money -= 25
                db.set(author.id, JSON.stringify(d))
              }
              if (d.money < 26) {
                chat.reply(adErr)
              }
              break;
            case 'google':
              if (d.money >= 40) {
                var adearn = getRandomInt(1, 10)
                chat.reply(`You advertised on google and earned ${adearn} shoppers.`)
                d.shoppers += adearn
                d.money -= 40
                db.set(author.id, JSON.stringify(d))
              }
              if (d.money < 41) {
                chat.reply(adErr)
              }
              break;
            case 'tv':
              if (d.money >= 50) {
                var adearn = getRandomInt(1, 15)
                chat.reply(`You advertised with TV ads and earned ${adearn} shoppers.`)
                d.shoppers += adearn
                d.money -= 50
                db.set(author.id, JSON.stringify(d))
              }
              if (d.money < 51) {
                chat.reply(adErr)
              }
              break;
            case 'spotify':
              if (d.money >= 60) {
                var adearn = getRandomInt(1, 20)
                chat.reply(`You advertised with Spotify ads and earned ${adearn} shoppers.`)
                d.shoppers += adearn
                d.money -= 61
                db.set(author.id, JSON.stringify(d))
              }
              if (d.money < 60) {
                chat.reply(adErr)
              }
              break;
            default:
              chat.reply('(!List of ADs) ||　lamppost || twitter || google || tv || spotify')
              break;
          }

        /*
        Spots
        */

        case '?change':
          switch (c[1]) {
            case "nickname":
              if (c[2] == undefined || c[2] == null || c[2] == '') {
                chat.reply('Your nickname cannot be empty!')
                break;
              }
              if (c[2].length > 50) {
                chat.reply('Your nickname cannot be more than 50 characters.')
                break;
              }
              d.nickname = c[2]
              db.set(author.id, JSON.stringify(d))
              chat.reply(`Your nickname has been changed to ${c[2]}.`)
              break;
            case "spot":
              switch (c[2]) {
                case "picturestore":
                  if (d.money >= 100000) {
                    chat.reply('You have moved to a picture store. Now you can earn for 30 seconds instead of 24!')
                    d.spot = "Picture Store"
                    db.set(author.id, JSON.stringify(d))
                    break;
                  }
                  if (d.money < 100000) {
                    chat.reply('The owner of the picture store told you to get $100,000 to buy this shop.')
                  }
                  break;
                case 'liquorstore':
                  if (d.money >= 250000) {
                    chat.reply('You have moved to a liquor store. Now you can earn for 35 seconds instead of 24!')
                    d.spot = "Liquor Store"
                    db.set(author.id, JSON.stringify(d))
                  }
                  if (d.money < 250000) {
                    chat.reply('The owner of the liquor store told you to get $250,000 to buy this shop.')
                  }
                  break;
                default:
                  chat.reply('What spot would you like to buy? Check out the spots with ?help spots or ?help spots (`spot name).')
              }
            default:
              chat.reply('Things you can change || Spot || Nickname')
          }
        case '?hire':
          if (d.money >= 100 * c[1]) {
            chat.reply(`You bought ${c[1]} workers. Cost: $${100 * c[1]}.`)
            d.money -= 100 * c[1]
            d.workers += parseInt(c[1])
            db.set(author.id, JSON.stringify(d))
            break;
          }
          if (d.money < 100 * c[1]) {
            chat.reply(`You don't have enough money to buy ${c[1]} workers.`)
            break;
          }
        case '?labor':
          if (laboring.includes(author.id)) {
            chat.reply(`Your workers are working. "Patience you must have, my young padawan." - Yoda(?)`)
            return;
          }
          if (d.workers != 0) {
            chat.reply(`Your workers started working for 5 days. (2 minutes)`)
            laboring.push(author.id)
            const workergain = d.workers * d.items * d.shoppers / 5
            setTimeout(function() {
              chat.reply(`Your workers have finished working and earned ${workergain}`)
              laboring.splice(laboring.indexOf(author.id), 1)
              d.money += parseInt(workergain)
              db.set(author.id, JSON.stringify(d))
            }, 120000)
          }
          if (d.workers == 0) {
            chat.reply("You don't have any workers and cannot run this command. (A worker is $100)")
            break;
          }
          break;

        case '?transport':
          switch (c[1]) {
            case 'farmer':
              var itemgain = getRandomInt(1, 5)
              chat.reply(`You transported ${itemgain} items from a farmer.`)
              d.items += itemgain
              db.set(author.id, JSON.stringify(d))
              break;
          }
          break;

        /*
        Easter Eggs
        */

        case '?sus':
          chat.reply(`You have unlocked the holy command and now have access to run the command "???". This will set your rank to sus which you can use to flex on people.`)
          break;
        case '???':
          chat.reply(`You have unlocked the power to become sus rank. Find the code in this video to get it. https://www.youtube.com/watch?v=Mdq6sQPKYqQ (Hint: It's at 4 ~ 9 seconds.)`)
          break;

        /*
        Admin Commands
        */
      }
    })
  }
})

import express from 'express'
const app = express()
app.get('/', (req, res) => res.send('Ready!'))
app.listen(3000);

/*
To-Do List
・
・
・
・
・
  */

/*
Current Version: v0.8
Estimated Release Version: v1.0
Estimated Release Data: Early August
Update Log
0.1 - Created & Start command
0.2 - Added a database
0.3 - Added most of the help menu
0.4 - Removed workers (Bringing back in a later update)
0.5 - Added the main command (?work)
0.65 - Added stats menu
0.7 - Added 5 ads & Finished help menu
0.8 - Added back workers & Spots
Estimations
0.9 - (current) Way to get more Items
0.95 - Finishing touches & Finishing the entire help menu
0.99 - Final bug fixes
1.0 - Release
*/
