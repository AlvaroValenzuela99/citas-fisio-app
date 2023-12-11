package alvarovalenzuela.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;

import javax.sql.DataSource;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Bean
    public UserDetailsManager userDetailsManager() {
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);
        // Configura tus consultas SQL aquí
        return userDetailsManager;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/admin").authenticated()  // Requiere autenticación solo para /admin/**
                .and()
                .formLogin()
                .loginPage("/login")  // Página de inicio de sesión personalizada, si es necesario
                .permitAll()
                .and()
                .httpBasic()
                .and()
                .csrf().disable();  // Desactiva CSRF, puedes ajustar según tus necesidades
    }
}
