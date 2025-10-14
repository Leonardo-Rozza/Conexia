package com.conexia.utils.jwt;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Component
public class JwtUtils {

    @Value("${security.jwt.secret}")
    private String key;

    @Value("${security.jwt.issuer}")
    private String user;

    @Value("${security.jwt.expiration}")
    private long expiredToken;

    public String createdToken(Authentication authentication){
      Algorithm algorithm = Algorithm.HMAC256(this.key);
      UserDetails userDetails = (UserDetails) authentication.getPrincipal();
      String username = userDetails.getUsername();

      return JWT.create()
              .withIssuer(this.user)
              .withSubject(username)
              .withIssuedAt(new Date())
              .withClaim("role", userDetails.getAuthorities().iterator().next().getAuthority())
              .withExpiresAt(new Date(System.currentTimeMillis() + this.expiredToken))
              .withJWTId(UUID.randomUUID().toString())
              .withNotBefore(new Date(System.currentTimeMillis()))
              .sign(algorithm);
    }

    public DecodedJWT validateToken(String token){
      try{
        Algorithm algorithm = Algorithm.HMAC256(this.key);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(this.user)
                .build();

        return verifier.verify(token);

      } catch (JWTVerificationException e){
        throw new JWTVerificationException("Token invalid, not authorized");
      }
    }

    public String extractUsername(DecodedJWT decodedJWT) {
      return decodedJWT.getSubject();
    }

    public Claim getSpecifictClaim(DecodedJWT decodedJWT, String claimName){
      return decodedJWT.getClaim(claimName);
    }

    public Map<String, Claim> getAllClaims(DecodedJWT decodedJWT){
      return decodedJWT.getClaims();
    }


}
