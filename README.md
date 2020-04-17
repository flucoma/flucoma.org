# FluCoMa

Static website, built with [11ty](https://www.11ty.io/), for [flucoma.org](http://www.flucoma.org/)

### Prerequisite 

`NPM`: node package manager.  

Can be installed via Node Version Manager https://github.com/nvm-sh/nvm#installing-and-updating

## Development

In the flucoma.org directory: 

Step 0. Install dependencies:

```bash
npm ci
```

### Run dev server, at [localhost:8080](http://localhost:8080/)

```bash
npm run dev
```

### Build, to `_site`

```bash
npm run build
```

## Deploy to web server

* Make sure our web server is in `/etc/hosts` as `flucoma`
* Make sure your user on our web server is a member of the `flucoma` group

```bash 
npm run deploy
```

You will be prompted for your SSH private key password, thereafter everything should be magic.

###### Design
By [Sam Smith](https://samsmith.name/)
