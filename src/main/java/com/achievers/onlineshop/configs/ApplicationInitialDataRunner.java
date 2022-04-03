package com.achievers.onlineshop.configs;

import com.achievers.onlineshop.admin.model.Setting;
import com.achievers.onlineshop.admin.repository.SettingRepository;
import com.achievers.onlineshop.security.model.ERole;
import com.achievers.onlineshop.security.model.Role;
import com.achievers.onlineshop.security.model.User;
import com.achievers.onlineshop.security.repository.RoleRepository;
import com.achievers.onlineshop.security.repository.UserRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ApplicationInitialDataRunner implements CommandLineRunner {
    protected final Log logger = LogFactory.getLog(getClass());

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SettingRepository settingRepository;

    @Override
    public void run(String... args) throws Exception {
        /*Role role = new Role(ERole.ROLE_USER);
        List<Role> roles = new ArrayList<>();
        roles.add(new Role(ERole.ROLE_USER));
        roles.add(new Role(ERole.ROLE_ADMIN));
        roles.add(new Role(ERole.ROLE_MODERATOR));
        roleRepository.saveAll(roles);


        User user = new User("manager","onlineshop.manager@gmail.com",passwordEncoder.encode("password"), "System Manager");
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).get();
        Set<Role> roles2 = new HashSet<>();
        roles2.add(adminRole);
        user.setRoles(roles2);
        userRepository.save(user);

        //Setting setting1 = new Setting("SaleEnabled", 10f);
        Setting setting2 = new Setting("TaxValue", 7.5f);

        //settingRepository.save(setting1);
        settingRepository.save(setting2);*/

        logger.info("Application started!");
    }
}
