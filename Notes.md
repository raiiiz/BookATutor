# Frontend


# Backend
- Password hashed with bcryptjs
```javascript
bcrypt.genSalt(numRounds, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash; // we save the hashed password in DB
        newUser.save()
            .then(user => res.json(user))
            .catch(err => console.error(err))
    })
})
```

- JWTs Generated by jsonwebtoken for Authentication (using Passport & PassportJWT for Validation)
```javascript
bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
        const payload = { id: user.id, name: user.name };
        // Sign token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            res.json(success: true, token: 'Bearer ' + token)
        });
    }
})
```

- Protected routes using Passport JWT auth strategy

- When user first logs in they don't have a profile: they are prompted to create one via profile form




